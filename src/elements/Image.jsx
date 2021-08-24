import { ImageView } from 'tabris'

import Widget from './Widget'
import { attrsToProps, propNamesToAttrNames, toAttrNameMap } from '../helpers'

const Image = {
  init (props) {},

  update (props, view) {
    view.image = props.image
  },

  render (props, context, handlers) {
    const { contentView } = context
    const view = <ImageView {...props} />
    contentView.append(view)
    return view
  },
}

Image.asElement = (UIElement) =>
  class ImageElement extends UIElement {
    static get observedAttributes() {
      return Image.attributeNames
    }

    init = Image.init
    update = Image.update
    render = Image.render
    attrsToProps = Image.attrsToProps
  }

Image.tagName = 'x-image'
Image.propNames = ['image'].concat(Widget.propNames)
Image.attributeNames = propNamesToAttrNames(Image.propNames)
Image.attributeNameMap = toAttrNameMap(Image.attributeNames, Image.propNames)
Image.attrsToProps = attrsToProps(Image.attributeNameMap)

export default Image
