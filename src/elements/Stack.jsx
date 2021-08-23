import { Stack as UIStack } from "tabris"

import Widget from './Widget'
import { attrsToProps, propNamesToAttrNames, toAttrNameMap } from '../helpers'

const Stack = {
  init (props) {},

  update (props, view) {},

  render (props, context, handlers) {
    const { contentView } = context
    const view = <UIStack {...props} />
    contentView.append(view)
    return view
  },
}

Stack.asElement = (UIElement) =>
  class StackElement extends UIElement {
    static get observedAttributes() {
      return Stack.attributeNames
    }

    init = Stack.init
    update = Stack.update
    render = Stack.render
    attrsToProps = Stack.attrsToProps
  }

Stack.tagName = 'x-stack'
Stack.propNames = ['alignment', 'spacing'].concat(Widget.propNames)
Stack.attributeNames = propNamesToAttrNames(Stack.propNames)
Stack.attributeNameMap = toAttrNameMap(Stack.attributeNames, Stack.propNames)
Stack.attrsToProps = attrsToProps(Stack.attributeNameMap)

export default Stack
