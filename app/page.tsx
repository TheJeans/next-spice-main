import Link from "next/link"

export default function Home() {
  return (
    <main className="p-24">
      <div>Interview Spice</div>
      <div>
        <div>
          <Link href="/spices">Spices</Link>
        </div>
        <div>
          <Link href="/blends">Blends</Link>
        </div>
      </div>
    </main>
  )
}
