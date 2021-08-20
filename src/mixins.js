export const withAttrs = BaseElement =>
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

export const withCreate = BaseElement =>
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

export const withInitAndUpdate = BaseElement =>
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

export const withMountAndRender = BaseElement =>
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

export const withUnmount = BaseElement =>
  class extends BaseElement {
    disconnectedCallback() {
      this.view.dispose()
      console.log(`${this.constructor.name} disconnected`)
    }
  }
