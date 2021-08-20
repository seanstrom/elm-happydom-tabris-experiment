import { TextView } from 'tabris'

const Text = {
  init (attrs) {},

  update (attrs, view) {
    view.text = attrs.text
  },

  render (attrs, context) {
    const { text } = attrs
    const { contentView } = context

    const view =
      <TextView centerY font='24px' text={text} />

    contentView.append(view)
    return view
  },
}

Text.asElement = UIElement => {
  console.log(Text.init)

  return class TextElement extends UIElement {
    static get observedAttributes() {
      return ['text']
    }

    init = Text.init
    update = Text.update
    render = Text.render
  }
}

Text.tagName = 'x-text'

export default Text
