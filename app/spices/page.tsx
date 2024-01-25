"use server";
import React from 'react';
import dynamic from 'next/dynamic';
import { fetchSpices } from "@/data/api";
import { Spice } from "@/types/interfaces";

/* 
Here I dynamically import the SearchInput component.
This is for client-side interaction.
But basically In this page, I'm fetching the initial list server-side.
Then I'm passing that list to the SearchInput component.
Then the SearchInput component is managing its own state and interactivity.
Why?
- SEO: I want the initial list to be available to crawlers.
- Performance: SSR can improve the initial load time.
- Reliability: I don't want to rely on client-side JS to fetch the initial list to avoid turned off JS or JS errors.
*/
const SearchInput = dynamic(() => import('../../components/SearchInput'), { ssr: false });

export default async function SpicesPage() {
    // fetching the initial list server-side for SEO
    const initialSpices: Spice[] = await fetchSpices(); 

    return (
        <section className="container mx-auto px-4">
            <div>
                <h1 className="text-7xl mt-20 mb-10 font-bold">Spice List</h1>
                <p className="max-w-4xl mb-14">
                    Explore our extensive collection of spices and blends. Use the search feature to narrow down your choices!
                </p>
            </div>
            <SearchInput initialSpices={initialSpices} />
        </section>
    );
}
