/**
 * @file src/components/Product/Information/Information.tsx
 * @link https://www.svgrepo.com/svg/453005/lol
 */

interface props {
  size: number,
  style: object
}

const LOL = ({
  size,
  style
}: props) => {
  return (
    <svg
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 400 400'
      style={style}
    >
      <path d='M146.908 224.236C166.925 338.455 270.014 242.583 254.072 234.939C223.437 220.252 188.739 224.824 157.327 213.527' stroke='#000000' stroke-opacity='0.9' stroke-width='16' stroke-linecap='round' stroke-linejoin='round' />
      <path d='M138.539 121.701C198.468 164.322 211.992 127.38 118 167.614' stroke='#000000' stroke-opacity='0.9' stroke-width='16' stroke-linecap='round' stroke-linejoin='round' />
      <path d='M281.249 120C260.39 132.103 242.818 140.507 228.533 145.211C250.501 156.133 268.072 163.034 281.249 165.913' stroke='#000000' stroke-opacity='0.9' stroke-width='16' stroke-linecap='round' stroke-linejoin='round' />
    </svg>
  )
}

export default LOL
