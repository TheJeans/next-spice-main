import { fetchBlends, fetchSpices } from "@/data/api"
import Link from "@/node_modules/next/link"

const Spices = async () => {
  const spices = await fetchSpices()
  const blends = await fetchBlends()
  console.log("render")
  return (
    <div className="p-24">
      <div>Spice List</div>
      {spices.map(spice => <div key={spice.name}><Link href={`/spice/${spice.name}`}>{spice.name}</Link></div>)}
      <div>Related Blends</div>
      {blends.map(blend => <div key={blend.name}>{blend.name}</div>)}
    </div>
  )
}

export default Spices