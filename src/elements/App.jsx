import { Composite, contentView as rootView } from "tabris"

import Widget from './Widget'
import { attrsToProps, propNamesToAttrNames, toAttrNameMap } from '../helpers'

const App = {
  init (props) {},

  update (props, view) {
    Object.assign(view, props)
  },

  render (props, context, handlers) {
    const { contentView = rootView } = context
    const view = <Composite {...props} />
    contentView.append(view)
    return view
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
