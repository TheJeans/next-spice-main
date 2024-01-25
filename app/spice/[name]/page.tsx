"use server";
import React from "react";
import { fetchSpice } from "@/data/api";
import { Spice } from "@/types/interfaces";
import Head from "next/head";
import { WithContext, Article } from "schema-dts";
import dynamic from "next/dynamic";

interface Params {
    name: string;
}

const SpiceInfo = dynamic(() => import("@/components/SpiceInfo"), {
    ssr: false,
});

export default async function SpiceDetailPage({ params }: { params: Params }) {
    const { name } = params;
    let spice: Spice | null | undefined;
    let error: string | null = null;

    try {
        spice = await fetchSpice(decodeURIComponent(name));
    } catch (err) {
        console.error("Failed to fetch spice", err);
        error = "Failed to load spice details.";
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
                <title>{spice.name} - Spice Details</title>
                <meta
                    name="description"
                    content={`Learn more about ${spice.name}, its color, heat level, and price.`}
                />
                {spiceStructuredData && (
                    <script type="application/ld+json">
                        {JSON.stringify(spiceStructuredData)}
                    </script>
                )}
            </Head>
            <SpiceInfo item={spice} />
        </>
    );
}
