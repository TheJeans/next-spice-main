import { fetchBlends, fetchSpices } from "@/data/api"

const Spices = async () => {
  const spices = await fetchSpices()
  const blends = await fetchBlends()
  console.log("render")
  return (
    <div className="p-24">
      <div>Blend List</div>
      {blends.map(blend => <div key={blend.name}>{blend.name}</div>)}
      <div>Related Spices</div>
      {spices.map(spice => <div key={spice.name}>{spice.name}</div>)}
    </div>
  )
}

export default Spices