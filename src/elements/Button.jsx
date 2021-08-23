import { Button as UIButton } from 'tabris'
import Widget from './Widget'

const Button = {
  init (props) {},

  update (props, view) {
    view.text = props.text
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

Button.attributeNames = Button.propNames.map(name => name.toLowerCase())

Button.attributeNameMap = Button.attributeNames.reduce((nameMap, attrName, index) => {
  return Object.assign(nameMap, {
    [attrName]: Button.propNames[index]
  })
}, {})

Button.attrsToProps = attrs => {
  const keys = Object.keys(attrs)
  const toPropName = attrName => Button.attributeNameMap[attrName]

  return keys.reduce((props, attrName) => {
    return Object.assign(props, {
      [toPropName(attrName)]: attrs[attrName]
    })
  }, {})
}

export default Button
