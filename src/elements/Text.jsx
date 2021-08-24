import { TextView } from 'tabris'

import Widget from './Widget'
import { attrsToProps, propNamesToAttrNames, toAttrNameMap } from '../helpers'

const Text = {
  init (props) {},

  update (props, view) {
    Object.assign(view, props)
  },

  render (props, context) {
    const { contentView } = context
    const view = <TextView {...props} />
    contentView.append(view)
    return view
  },
}

Text.asElement = UIElement => {
  return class TextElement extends UIElement {
    static get observedAttributes() {
      return Text.attributeNames
    }

    init = Text.init
    update = Text.update
    render = Text.render
    attrsToProps = Text.attrsToProps
  }
}

Text.tagName = 'x-text'

Text.propNames = [
  'text',
  'font',
  'alignment',
  'lineSpacing',
  'markupEnabled',
  'maxLines',
  'selectable',
  'textColor'
].concat(Widget.propNames)

Text.attributeNames = propNamesToAttrNames(Text.propNames)
Text.attributeNameMap = toAttrNameMap(Text.attributeNames, Text.propNames)
Text.attrsToProps = attrsToProps(Text.attributeNameMap)

export default Text
