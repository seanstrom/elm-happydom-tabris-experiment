import { Row as UIRow } from "tabris"

import Widget from './Widget'
import { attrsToProps, propNamesToAttrNames, toAttrNameMap } from '../helpers'

const Row = {
  init (props) {},

  update (props, view) {
    Object.assign(view, props)
  },

  render (props, context, handlers) {
    const { contentView } = context
    const view = <UIRow {...props} />
    contentView.append(view)
    return view
  },
}

Row.asElement = (UIElement) =>
  class RowElement extends UIElement {
    static get observedAttributes() {
      return Row.attributeNames
    }

    init = Row.init
    update = Row.update
    render = Row.render
    attrsToProps = Row.attrsToProps
  }

Row.tagName = 'x-row'
Row.propNames = ['alignment', 'spacing'].concat(Widget.propNames)
Row.attributeNames = propNamesToAttrNames(Row.propNames)
Row.attributeNameMap = toAttrNameMap(Row.attributeNames, Row.propNames)
Row.attrsToProps = attrsToProps(Row.attributeNameMap)

export default Row
