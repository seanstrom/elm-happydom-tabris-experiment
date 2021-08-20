import { Row, contentView } from "tabris"

const App = {
  init (attrs) {},

  update (attrs, view) {},

  render (attrs, context, handlers) {
    const view = <Row center spacing={20} />
    contentView.append(view)
    return view
  },
}

App.asElement = (UIElement) =>
  class AppElement extends UIElement {
    init = App.init
    update = App.update
    render = App.render
  }

App.tagName = 'x-app'

export default App
