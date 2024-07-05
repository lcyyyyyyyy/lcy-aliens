const Product = async ({ params }: { params: { id: string } }) => {

  return (
    <main>
      <p>{params.id}</p>
    </main>
  )
}

export const generateStaticParams = () => {
  return []
}

export default Product
