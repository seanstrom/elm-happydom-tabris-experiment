import { contentView } from "tabris"

import Widget from './Widget'
import { attrsToProps, propNamesToAttrNames, toAttrNameMap } from '../helpers'

const App = {
  init (attrs) {},

  update (attrs, view) {},

  render (attrs, context, handlers) {
    return contentView
  },
}

App.asElement = (UIElement) =>
  class AppElement extends UIElement {
    static get observedAttributes() {
      return App.attributeNames
    }

    init = App.init
    update = App.update
    render = App.render
    attrsToProps = App.attrsToProps
  }

App.tagName = 'x-app'
App.propNames = Widget.propNames
App.attributeNames = propNamesToAttrNames(App.propNames)
App.attributeNameMap = toAttrNameMap(App.attributeNames, App.propNames)
App.attrsToProps = attrsToProps(App.attributeNameMap)

export default App