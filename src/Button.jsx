import { Button as UIButton, Row, TextView } from 'tabris'

const Button = {
  init (attrs) {},

  update (attrs, view) {
    view.text = attrs.text
  },

  render (attrs, context, handlers) {
    const { text } = attrs
    const { onTap } = handlers
    const { contentView } = context

    const view =
      <UIButton centerY onSelect={onTap}>
        {text}
      </UIButton>

    contentView.append(view)
    return view
  },
}

export default Button
