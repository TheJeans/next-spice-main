"use server";
import React from "react";
import { fetchBlends, fetchSpices } from "@/data/api";
import { Spice, Blend } from "@/types/interfaces";
import Link from "next/link";
import SearchComponent from "../../components/SearchComponent";

export default async function Spices() {
    let spices: Spice[] = [];
    let blends: Blend[] = [];
    let error: string | null = null;

    try {
        spices = await fetchSpices();
        blends = await fetchBlends();
    } catch (e) {
        console.error("Failed to fetch spices or blends", e);
        error = e instanceof Error ? e.message : 'An unknown error occurred';
    }

    if (error) {
        return <div>Error loading spices and blends: {error}</div>;
    }

    return (
        <main>
            <h1>Spice List</h1>
            <ul>
                {spices.map(spice => (
                    <li key={spice.name}>
                        <Link href={`/spice/${encodeURIComponent(spice.name)}`}>
                            {spice.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <h2>Related Blends</h2>
            <ul>
                {blends.map(blend => (
                    <li key={blend.name}>{blend.name}</li>
                ))}
            </ul>
        </main>
    );
}
