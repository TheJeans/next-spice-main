/* 
Before:
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
import React, { useState, useEffect } from "react";
import { fetchBlends, fetchSpices } from "@/data/api";
import { Spice, Blend } from "@/types/interfaces";
import Link from "next/link";
import SearchComponent from "../../components/SearchComponent";

const Spices = () => {
    const [spices, setSpices] = useState<Spice[]>([]);
    const [filteredSpices, setFilteredSpices] = useState<Spice[]>([]);
    const [blends, setBlends] = useState<Blend[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedSpices = await fetchSpices();
                const fetchedBlends = await fetchBlends();
                setSpices(fetchedSpices);
                setFilteredSpices(fetchedSpices);
                setBlends(fetchedBlends);
            } catch (error) {
                console.error("Failed to fetch spices or blends", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div role="status" aria-live="polite">Loading spices and blends...</div>;
    }

    return (
        <main>
            <h1>Spice List</h1>
            <SearchComponent data={spices} onSearchResult={setFilteredSpices} />
            <ul>
                {filteredSpices.length > 0 ? (
                    filteredSpices.map(spice => (
                        <li key={spice.name}>
                            <Link href={`/spice/${encodeURIComponent(spice.name)}`}>
                                {spice.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>No matching spices found.</p>
                )}
            </ul>

            <h2>Related Blends</h2>
            <ul>
                {blends.map(blend => (
                    <li key={blend.name}>{blend.name}</li>
                ))}
            </ul>
        </main>
    );
};

export default Spices;
