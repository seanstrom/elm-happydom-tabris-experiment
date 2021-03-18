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

export default Text
