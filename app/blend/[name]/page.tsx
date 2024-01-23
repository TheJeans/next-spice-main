/* 
Before:
- not here!

After:
- semantic html
- loading state
- error handling
- accessible experience and navigation
- fetches spice name and link from API 
- fetches related blends from API
*/

"use client";
import { fetchBlend, fetchBlendById, fetchSpiceById } from "@/data/api";
import { Blend, Spice } from "@/types/interfaces";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BlendDetailPage({
    params,
}: {
    params: { name: string };
}) {
    const [blend, setBlend] = useState<Blend | null | undefined>(null);
    const [relatedBlends, setRelatedBlends] = useState<Blend[]>([]);
    const [spices, setSpices] = useState<Spice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedBlend = await fetchBlend(
                    decodeURIComponent(params.name)
                );
                setBlend(fetchedBlend);

                if (fetchedBlend && fetchedBlend.spices) {
                    const spiceDetails = await Promise.all(
                        fetchedBlend.spices.map((spiceId) =>
                            fetchSpiceById(spiceId)
                        )
                    );
                    setSpices(
                        spiceDetails.filter((spice): spice is Spice => !!spice)
                    );
                }
                if (fetchedBlend && fetchedBlend.blends) {
                    const relatedBlendDetails = await Promise.all(
                        fetchedBlend.blends.map((blendId) =>
                            fetchBlendById(blendId)
                        )
                    );
                    setRelatedBlends(
                        relatedBlendDetails.filter(
                            (blend): blend is Blend => !!blend
                        )
                    );
                }
            } catch (err) {
                console.error("Failed to fetch blend", err);
                setError("Failed to load blend details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params.name]);

    if (isLoading) {
        return (
            <div role="status" aria-live="polite">
                Loading blend details...
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

    if (!blend) {
        return <div>No blend details available.</div>;
    }

    return (
        <main>
            <article>
                <h1>{blend.name}</h1>
                {blend.blends && blend.blends.length > 0 && (
                    <>
                        <p>Other Blends:</p>
                        <ul aria-label="Other blends in this blend">
                            {relatedBlends.map(relatedBlend => (
                                <li key={relatedBlend.id}>
                                    <Link href={`/blend/${encodeURIComponent(relatedBlend.name)}`}>
                                        {relatedBlend.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                <p>Spices in this Blend:</p>
                <ul aria-label={`Spices in ${blend.name} blend`}>
                    {spices.map((spice) => (
                        <li key={spice.id}>
                            <Link
                                href={`/spice/${encodeURIComponent(
                                    spice.name
                                )}`}
                            >
                                {spice.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <p>Description: {blend.description}</p>
            </article>
        </main>
    );
}
