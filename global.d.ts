declare namespace JSX {
  interface IntrinsicElements {
    'swiper-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      ref: any
      init: boolean
    }
    'swiper-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      key: string
    }
  }
}