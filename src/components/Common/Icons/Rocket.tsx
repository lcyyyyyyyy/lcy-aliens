/**
 * @file src/app/template.tsx
 * @link https://www.svgrepo.com/svg/452617/rocket
 */

interface props {
  size: number,
  style: object
}

const Rocket = ({
  size,
  style
}: props) => {
  return (
    <svg
      id='icon-rocket'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 400 400'
      style={style}
    >
      <path d='M205.219 248.213C200.332 235.575 163.123 237.517 161.047 227.16C160.257 223.22 169.712 210.524 171.594 206.769C196.39 157.291 219.486 119.777 266.537 88.4835C268.112 87.435 279.933 81.2738 302 70C300.694 90.5731 299.497 106.287 298.409 117.142C295.898 142.209 277.726 179.834 266.537 202.164C255.255 224.673 240.137 248.727 219.724 264' stroke='#000000' strokeOpacity='0.9' strokeWidth='16' strokeLinecap='round' strokeLinejoin='round' />
      <path opacity='0.503384' d='M146.403 255C142.377 260.619 137.222 268.771 131.829 274.146C123.928 282.02 124.182 282.063 115.931 286.691C114.784 287.333 93.9426 294.117 98.7067 297.913C108.151 305.445 140.687 283.25 149.716 278.106C156.362 274.322 164.681 259.213 168.928 265.565C178.062 279.218 134.355 311.406 138.453 323.661C142.277 335.093 178.676 285.369 180.188 285.369C185.972 285.369 164.269 322.107 177.538 330.923C180.455 332.863 194.462 297.447 195.426 293.292C206.377 245.992 199.288 318.823 210 276.126' stroke='#000000' strokeOpacity='0.9' strokeWidth='16' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M175 176.483C170.029 157.549 121.816 221.987 125.167 221.987C134.008 221.987 147.643 222.225 157.059 220.666' stroke='#000000' strokeOpacity='0.9' strokeWidth='16' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M257.62 240C263.093 258.342 259.358 279.683 244 292' stroke='#000000' strokeOpacity='0.9' strokeWidth='16' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M227 272C232.842 280.723 237 298.839 237 304' stroke='#000000' strokeOpacity='0.9' strokeWidth='16' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M263.687 122.406C269.038 120.811 273.22 124.057 273.861 129.661C274.594 136.085 272.468 145.247 266.401 148.786C245.741 160.839 237.205 119.617 263.011 122.406' stroke='#000000' strokeOpacity='0.9' strokeWidth='16' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default Rocket
