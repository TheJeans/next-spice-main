"use server";
import React from "react";
import dynamic from "next/dynamic";
import { fetchBlends } from "@/data/api";
import { Blend } from "@/types/interfaces";
import Head from "next/head";

/* (Same information as in app/spices/page.tsx)
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
const SearchBlendsInput = dynamic(
    () => import("@/components/SearchBlendsInput"),
    { ssr: false }
);

export default async function BlendsPage() {
    // fetching the initial list server-side for SEO
    const initialBlends: Blend[] = await fetchBlends();

    const blendsStructuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: initialBlends.map((blend, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: blend.name,
        })),
    };

    return (
        <>
            <Head>
                <script type="application/ld+json">
                    {JSON.stringify(blendsStructuredData)}
                </script>
            </Head>
            <section className="container mx-auto px-4 mb-10">
                <div>
                    <h1 className="text-7xl mt-20 mb-10 font-bold">
                        Blend List
                    </h1>
                    <p className="max-w-4xl mb-14">
                        Explore our extensive collection of spices and blends.
                        Use the search feature to narrow down your choices!
                    </p>
                </div>
                <SearchBlendsInput initialBlends={initialBlends} />
            </section>
        </>
    );
}
