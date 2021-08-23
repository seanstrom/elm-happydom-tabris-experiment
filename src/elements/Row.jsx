import { Row as UIRow, contentView } from "tabris"

const Row = {
  init (attrs) {},

  update (attrs, view) {},

  render (attrs, context, handlers) {
    const view = <UIRow center spacing={20} />
    contentView.append(view)
    return view
  },
}

Row.asElement = (UIElement) =>
  class RowElement extends UIElement {
    init = Row.init
    update = Row.update
    render = Row.render
  }

Row.tagName = 'x-row'

export default Row
