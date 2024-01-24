/* 
Before:
- was an async function which isn't standard
- fetchSpice could return null or undefined and that wasn't handled
- no loading state
- no error handling
- no semantic html 

After:
- semantic html
- loading state
- error handling
- accessible experience
- correct type handling for fetchSpice being null or undefined
- json-ld structured data
- 
*/

"use client";
import { fetchSpice } from "@/data/api";
import { Spice } from "@/types/interfaces";
import Head from "next/head";
import { useState, useEffect } from "react";
import { WithContext, Article } from "schema-dts";

export default function SpiceDetailPage({
    params,
}: {
    params: { name: string };
}) {
    const [spice, setSpice] = useState<Spice | null | undefined>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedSpice = await fetchSpice(
                    decodeURIComponent(params.name)
                );
                setSpice(fetchedSpice);
            } catch (err) {
                console.error("Failed to fetch spice", err);
                setError("Failed to load spice details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params.name]);

    if (isLoading) {
        return (
            <div role="status" aria-live="polite">
                Loading spice details...
            </div>
        );
    }

    if (error) {
        return (
            <div role="alert" aria-live="assertive">
                Error: {error}
            </div>
        );
    }

    if (!spice) {
        return <div>No spice details available.</div>;
    }

    const spiceStructuredData: WithContext<Article> = {
        "@context": "https://schema.org",
        "@type": "Article",
        name: spice.name,
        description: `Learn about ${spice.name}, its color, heat level, and price.`,
        articleBody:
            `The ${spice.name} is known for its color (${spice.color}) and a ${spice.heat} on the heat level.` +
            (spice.price ? ` It is priced around ${spice.price}.` : ""),
    };

    return (
        <>
            <Head>
                <title>{spice ? `${spice.name} Details` : 'Loading...'}</title>
                <meta name="description" content={`Learn more about ${spice.name}, its color, heat level, and price.`} />
                <meta property="og:title" content={`${spice.name} Details`} />
                <meta property="og:description" content={`Detailed information about ${spice.name}.`} />
            </Head>
            <main className="p-24">
                <article>
                    <h1>Spice Detail: {spice.name}</h1>
                    <ul>
                        <li>Name: {spice.name}</li>
                        <li>Price: {spice.price}</li>
                        <li>Heat Level: {spice.heat}</li>
                        <li>Color: {spice.color}</li>
                    </ul>
                </article>
            </main>
            {spiceStructuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(spiceStructuredData)}
                </script>
            )}
        </>
    );
}
