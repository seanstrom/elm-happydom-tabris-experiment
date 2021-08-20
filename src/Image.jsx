import { ImageView } from 'tabris'

const Image = {
  init (attrs) {},

  update (attrs, view) {
    view.image = attrs.src
  },

  render (attrs, context, handlers) {
    const { src } = attrs
    const { contentView } = context

    const view = <ImageView image={src} />
    contentView.append(view)
    return view
  },
}

export default Image
