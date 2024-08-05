/**
 * @file src/components/Product/Information/Information.tsx
 * @link https://www.svgrepo.com/svg/452438/agreement
 */

interface props {
  size: number,
  color: string,
  style: object,
  onClick: Function
}

const Form = ({
  size,
  color,
  style,
  onClick
}: props) => {
  return (
    <svg
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 400 400'
      style={style}
      onClick={() => onClick()}
    >
      <path d='M83.7369 288.444C80.6561 259.715 80.1284 230.813 80.1284 201.89C80.1284 181.285 71.8196 116.625 78.7768 99.3229C79.9498 96.4035 96.6129 94.5956 98.6911 94.9388C111.692 97.0949 201.295 89.4578 209.969 92.9101C215.486 95.1026 221.59 105.823 226.201 109.95C263.285 143.152 250.998 128.911 250.998 183.502' stroke='#000000' stroke-opacity='0.9' stroke-width='16' stroke-linecap='round' stroke-linejoin='round' />
      <path d='M248.47 271.071C245.796 276.081 253.619 303.435 248.47 305.96C243.147 308.568 105.302 309.164 92.0859 307.725' stroke='#000000' stroke-opacity='0.9' stroke-width='16' stroke-linecap='round' stroke-linejoin='round' />
      <path d='M209.698 101.354C217.998 112.241 202.962 126.528 204.859 135.991C205.025 136.812 239.235 132.624 243.567 133.8' stroke='#000000' stroke-opacity='0.9' stroke-width='16' stroke-linecap='round' stroke-linejoin='round' />
      <path d='M114.875 137.008C126.219 137.842 137.244 132.895 148.388 133.893' stroke='#000000' stroke-opacity='0.9' stroke-width='12' stroke-linecap='round' stroke-linejoin='round' />
      <path d='M112.195 174.004C135.077 175.684 160.792 169.855 181.903 171.779' stroke='#000000' stroke-opacity='0.9' stroke-width='12' stroke-linecap='round' stroke-linejoin='round' />
      <path d='M117.555 206.926C120.532 205.792 123.308 199.76 126.94 200.275C150.41 203.605 159.345 207.493 184.581 204.71' stroke='#000000' stroke-opacity='0.9' stroke-width='12' stroke-linecap='round' stroke-linejoin='round' />
      <path d='M117.555 242.192C133.916 243.182 136.025 236.872 157.771 241.302' stroke='#000000' stroke-opacity='0.9' stroke-width='12' stroke-linecap='round' stroke-linejoin='round' />
      <path d='M235.656 227.352C248.017 211.693 272.226 178.413 284.956 162.912C296.461 148.902 295.801 135.225 316.285 148.828C332.535 159.622 316.949 170.237 307.48 183.104C305.858 185.306 260.957 245.463 259.98 245.302C251.825 243.948 242.427 227.833 233.675 230.014C232.292 230.358 222.373 262.4 221.817 265.159C219.947 274.467 248.921 251.813 256.699 248.71' stroke='#000000' stroke-opacity='0.9' stroke-width='16' stroke-linecap='round' stroke-linejoin='round' />
      <path opacity='0.502093' d='M219.436 270.196C218.823 237.421 198.241 279.401 190.363 280.408C185.311 281.052 186.408 263.032 178.096 260.908C170.513 258.973 168.995 272.75 162.647 274.372C156.97 275.823 146.425 272.395 137.664 274.836' stroke='#000000' stroke-opacity='0.9' stroke-width='16' stroke-linecap='round' stroke-linejoin='round' />
    </svg>
  )
}

export default Form
