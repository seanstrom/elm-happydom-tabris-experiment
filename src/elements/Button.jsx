import { Button as UIButton } from 'tabris'

import Widget from './Widget'
import { attrsToProps, propNamesToAttrNames, toAttrNameMap } from '../helpers'

const Button = {
  init (props) {},

  update (props, view) {
    Object.assign(view, props)
  },

  render (props, context, handlers) {
    const { onSelect } = handlers
    const { contentView } = context

    const view =
      <UIButton {...props} onSelect={onSelect} />

    contentView.append(view)
    return view
  },
}

Button.asElement = (UIElement, { CustomEvent }) =>
  class ButtonElement extends UIElement {
    static get observedAttributes() {
      return Button.attributeNames
    }

    init = Button.init
    update = Button.update
    attrsToProps = Button.attrsToProps

    render = (props, context) =>
      Button.render(props, context, {
        onSelect: this.onSelect
      })

    onSelect = () =>
      this.dispatchEvent(new CustomEvent('tap-button'))
  }

Button.tagName = 'x-button'

Button.propNames = [
  'text',
  'style',
  'strokeWidth',
  'strokeColor',
  'alignment',
  'autoCapitalize',
  'image',
  'imageTintColor',
  'text',
  'textColor',
  'font'
].concat(Widget.propNames)

Button.attributeNames = propNamesToAttrNames(Button.propNames)
Button.attributeNameMap = toAttrNameMap(Button.attributeNames, Button.propNames)
Button.attrsToProps = attrsToProps(Button.attributeNameMap)

export default Button
