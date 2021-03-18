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

export default App
