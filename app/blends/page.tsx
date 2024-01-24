"use client";
import { fetchBlends, fetchSpices } from "@/data/api";
import { Spice, Blend } from "@/types/interfaces";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchComponent from "../../components/SearchComponent";

const Blends = () => {
    const [spices, setSpices] = useState<Spice[]>([]);
    const [blends, setBlends] = useState<Blend[]>([]);
    const [filteredBlends, setFilteredBlends] = useState<Blend[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedSpices = await fetchSpices();
                const fetchedBlends = await fetchBlends();
                setSpices(fetchedSpices);
                setBlends(fetchedBlends);
                setFilteredBlends(fetchedBlends); // Initialize filtered blends with all blends
            } catch (error) {
                console.error("Failed to fetch spices or blends", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div role="status" aria-live="polite">Loading blends and spices...</div>;
    }

    return (
        <main>
            <h1>Blend List</h1>
            <SearchComponent data={blends} onSearchResult={setFilteredBlends} />
            {filteredBlends.length > 0 ? (
                <ul>
                    {filteredBlends.map((blend) => (
                        <li key={blend.name}>
                            <Link href={`/blend/${encodeURIComponent(blend.name)}`}>
                                {blend.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No blends available.</p>
            )}

            <h2>Related Spices</h2>
            <ul>
                {spices.map((spice) => (
                    <li key={spice.name}>
                        <Link href={`/spice/${encodeURIComponent(spice.name)}`}>
                            {spice.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default Blends;
