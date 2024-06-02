export async function getHouses() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses`)

  console.log(response)
}
