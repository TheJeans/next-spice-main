"use client";
import { fetchBlends, fetchSpices } from "@/data/api";
import { Spice, Blend } from "@/types/interfaces";
import Link from "next/link";
import { useState, useEffect } from "react";

const Blends = () => {
    const [spices, setSpices] = useState<Spice[]>([]);
    const [blends, setBlends] = useState<Blend[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedSpices = await fetchSpices();
                const fetchedBlends = await fetchBlends();
                setSpices(fetchedSpices);
                setBlends(fetchedBlends);
            } catch (error) {
                console.error("Failed to fetch spices or blends", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // TODO: better placeholder content
    if (isLoading) {
        return <div role="status" aria-live="polite">Loading blends and spices...</div>;
    }

    return (
        <main>
            <h1>Blend List</h1>
            {blends.length > 0 ? (
                <ul>
                    {blends.map((blend) => (
                        <li key={blend.name}>
                            <Link
                                href={`/blend/${encodeURIComponent(
                                    blend.name
                                )}`}
                            >
                                {blend.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No blends available.</p>
            )}

            <h2>Related Spices</h2>
            {spices.length > 0 ? (
                <ul>
                    {spices.map((spice) => (
                        <li key={spice.name}>
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
            ) : (
                <p>No spices available.</p>
            )}
        </main>
    );
};

export default Blends;
