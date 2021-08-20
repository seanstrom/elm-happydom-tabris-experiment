import { Window } from 'happy-dom'
import { runInContext } from 'vm-shim'

import Elm from './elm-dist/elm-bundle'
import * as allElements from './elements'

const withAttrs = BaseElement =>
  class extends BaseElement {
    static get observedAttributes() {
      return []
    }

    getAttributes () {
      const getAttrs = (attrs, attrName) =>
        Object.assign(attrs, {
          [attrName]: this.getAttribute(attrName)
        })

      return this.constructor.observedAttributes.reduce(getAttrs, {})
    }
  }

const withCreate = BaseElement =>
  class extends BaseElement {
    constructor () {
      /**
       * Create section, add code here to configure element
       * before insertion into document or attributes are received.
      */

      super()
      console.log(`${this.constructor.name} created`)
    }
  }

const withInitAndUpdate = BaseElement =>
  class extends BaseElement {
    attributeChangedCallback() {
      this.attrs = this.getAttributes()

      /**
       * Pre-Connect section, add code here to receive
       * initial attributes before connect.
      */

      if (!this.isConnected) {
        this.init(this.attrs)
        console.log(`${this.constructor.name} init`)
      }

      /**
       * Update section, add code here to manage updating
       * with new attributes after connect.
      */

      if (this.isConnected) {
        this.update(this.attrs, this.view)
        console.log(`${this.constructor.name} update`)
      }
    }
  }

const withMountAndRender = BaseElement =>
  class extends BaseElement {
    connectedCallback() {
      /**
       * Connect section, add code here to configure initial render
       * and context for children.
      */

      if (this.isConnected) {
        this.view = this.render(this.attrs, {
          contentView: this.parentNode.view
        })

        console.log(`${this.constructor.name} connected`)
      }
    }
  }

const withUnmount = BaseElement =>
  class extends BaseElement {
    disconnectedCallback() {
      this.view.dispose()
      console.log(`${this.constructor.name} disconnected`)
    }
  }

const initElements = params => {
  const { app, window } = params
  const { HTMLElement, customElements } = window

  const mix = (klass, mixin) => mixin(klass)
  const UIElement = app.mixins.reduce(mix, HTMLElement)

  app.elements.forEach(rawElement => {
    const name = rawElement.tagName
    const element = rawElement.asElement(UIElement, window)
    customElements.define(name, element)
  })
}

function init () {
  /**
   * Create a virtual window and document for executing HTML and JavaScript.
  */

  const window = new Window()
  const document = window.document


  /**
   * Patch `insertBefore` function to default reference node to null when passed undefined.
   * This is technically only needed for an Elm issue in version 1.0.2 of the VirtualDom
   * More context here: https://github.com/elm/virtual-dom/issues/161
   * And here: https://github.com/elm/virtual-dom/blob/1.0.2/src/Elm/Kernel/VirtualDom.js#L1409
  */

  const insertBefore = window.Node.prototype.insertBefore
  window.Node.prototype.insertBefore = function (...args) {
    const [newNode, refNode] = args
    const hasRefNode = args.length > 1
    const isRefNodeDefined = typeof refNode !== 'undefined'

    if (hasRefNode && !isRefNodeDefined)
      return insertBefore.call(this, newNode, null)

    return insertBefore.call(this, ...args)
  }


  /**
   * Build context for web scripts to with:
   * - window
   * - document
   * - all of window globals
   * - the compiled elm app
   * - the app bindings to the native ui
  */ 

  const app = {
    mixins: [
      withAttrs,
      withCreate,
      withInitAndUpdate,
      withMountAndRender,
      withUnmount,
    ],

    elements: Object.values(allElements)
  }

  const context = {
    ...window,
    Elm,
    app,
    window,
    document,
    initElements,
  }


  /**
   * Required to override for rendering.
   * Seems to be needed by parts of the boot process,
   * if not provided it seems the cordova `document` will be used.
  */

  global.document = document


  /**
   * Define our HTML and JavaScript to load in our virtual document.
  */

  const html = `
    <html>
        <head>
           <title>App</title>
        </head>
        <body>
           <div id='root'>
              <!–– Content will be added here -->
           </div>
        </body>
    </html>
  `

  const customElementScript = `
    initElements({ app, window })
  `


  /**
   * `Elm` is imported as a function since we want to defer executing the
   * compiled JavaScript until it is the virtual document.
   *
   * This is provided by a custom compilation step,
   * which is defined in the `compile-elm-to-bundle` script,
   * located in the root project directory.
  */

  const elmInitScript = `
    Elm().Main.init({
      node: window.document.getElementById('root')
    })
  `


  /**
   * Write the html template to the virtual document,
   * and then run scripts to define custom elements and start Elm app.
  */

  document.write(html)
  runInContext(customElementScript, context)
  runInContext(elmInitScript, context)
}

init()
