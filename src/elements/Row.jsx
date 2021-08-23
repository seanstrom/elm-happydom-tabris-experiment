import { Row as UIRow, contentView } from "tabris"

import Widget from './Widget'
import { attrsToProps, propNamesToAttrNames, toAttrNameMap } from '../helpers'

const Row = {
  init (attrs) {},

  update (attrs, view) {},

  render (attrs, context, handlers) {
    const view = <UIRow {...attrs} />
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
