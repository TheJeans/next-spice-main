/* 
Origionally:
- everything was a div lol
- no loading function
- no error handling
- no accessibilty or user experience considerations
- no TS typing

After:
- semantic html
- loading state
- error handling
- accessible experience and navigation
- conditional rendering!
*/

"use client";
import { fetchBlends, fetchSpices } from "@/data/api";
import { Spice, Blend } from "@/types/interfaces";
import Link from "next/link";
import { useState, useEffect } from "react";

const Spices = () => {
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
        return <div>Loading spices and blends...</div>;
    }

    return (
        <main>
            <h1>Spice List</h1>
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

            <h2>Related Blends</h2>
            {blends.length > 0 ? (
                <ul>
                    {blends.map((blend) => (
                        <li key={blend.name}>{blend.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No blends available.</p>
            )}
        </main>
    );
};

export default Spices;
