import { runInContext } from 'vm-shim';
import { createContext } from 'vm-browserify';
import Window from 'happy-dom/lib/window/Window';

import App from './App';
import Elm from './elm-dist/elm-bundle';

function init(App) {
  /**
   * Create a virtual window and document for executing HTML and JavaScript.
   */
  const window = new Window();
  const document = window.document;

  /**
   * Build context for web scripts to with:
   * - window
   * - document
   * - all of window globals
   * - the compiled elm app
   * - the app bindings to the native ui
  */ 
  const context = {
    ...window,
    window,
    document,
    App,
    Elm,
  };

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
           <title>Test page</title>
        </head>
        <body>
          <div>
             <div id="myapp">
                <!–– Content will be added here -->
             </div>
          </div>
        </body>
    </html>
  `;

  const customElementScript = `
    class Yay extends HTMLElement {
      static get observedAttributes() {
        return ['count'];
      }

      constructor() {
        super();
      }

      connectedCallback() {
        console.log('connected');
        const count = this.getAttribute('count');
        App.start({
          count: count,
          onIncrement: this.onIncrement.bind(this),
          onDecrement: this.onDecrement.bind(this)
        });
      }

      attributeChangedCallback() {
        if (!this.isConnected) return;
        console.log('attributes changed');
        const count = this.getAttribute('count');
        App.setCount({ count });
      }

      onIncrement() {
        this.dispatchEvent(
          new CustomEvent('tap-increment')
        );
      }

      onDecrement() {
        this.dispatchEvent(
          new CustomEvent('tap-decrement')
        );
      }
    }

    customElements.define("x-yay", Yay)                                  
  `;

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
      node: window.document.getElementById('myapp')
    });
  `;

  /**
   * Write the html template to the virtual document,
   * and then run scripts to define custom elements and start Elm app.
   */
  document.write(html);
  runInContext(customElementScript, context);
  runInContext(elmInitScript, context)
}

init(App);
