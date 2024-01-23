import Link from "next/link";

export default function Home() {
    return (
        <>
            <a href="#mainContent" className="skip-link">
                Skip to content
            </a>

            <header>
                <h1>Interview Spice</h1>
            </header>

            <nav aria-label="Main navigation">
                <ul>
                    <li>
                        <Link href="/spices" aria-label="Learn more about spices">
                            Spices
                        </Link>
                    </li>
                    <li>
                        <Link href="/blends" aria-label="Learn more about blends">
                            Blends
                        </Link>
                    </li>
                </ul>
            </nav>

            <main id="mainContent">
                {/* something here later */}
            </main>
        </>
    );
}
