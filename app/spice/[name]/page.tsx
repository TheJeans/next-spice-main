import { fetchSpice } from "@/data/api"
interface Spice {
  id: number,
  name: string,
  price: string,
  heat: number,
  color: string
}

const Spices = async ({params} : {params: any}) => {
  const spice = await fetchSpice(decodeURIComponent(params.name))
  return (
    <div className="p-24">
      <div>Spice Detail</div>
      <div>Name: {spice.name}</div>
      <div>Price: {spice.price}</div>
      <div>Heat: {spice.heat}</div>
      <div>Color: {spice.color}</div>
    </div>
  )
}

export default Spices