/**
 * @file src/components/Items/Items.tsx
 * @file src/components/Product/Information/Information.tsx
 */

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})


/**
 * @file src/components/Items/Items.tsx
 * @file src/components/Product/Gallery/Gallery.tsx
 */

export const getRandom = (min: number, max: number) => {
  return Number((Math.random() * (max - min + 1)).toFixed(2)) + min
}
