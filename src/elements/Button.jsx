import { Button as UIButton } from 'tabris'

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

Button.asElement = (UIElement, { CustomEvent }) =>
  class ButtonElement extends UIElement {
    static get observedAttributes() {
      return ['text']
    }

    init = Button.init
    update = Button.update

    render = (attrs, context) =>
      Button.render(attrs, context, {
        onTap: this.onTap
      })

    onTap = () =>
      this.dispatchEvent(new CustomEvent('tap-button'))
  }

Button.tagName = 'x-button'

export default Button
