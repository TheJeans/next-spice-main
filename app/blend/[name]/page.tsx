"use server";
import React from "react";
import { fetchBlend, fetchBlendById, fetchSpiceById } from "@/data/api";
import { Blend, Spice } from "@/types/interfaces";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Article, WithContext } from "schema-dts";

interface Params {
    name: string;
}

const BlendInfo = dynamic(() => import("@/components/BlendInfo"), {
    ssr: false,
});

export default async function BlendDetailPage({ params }: { params: Params }) {
    const { name } = params;
    let blend: Blend | null | undefined;
    let relatedBlends: Blend[] = [];
    let spices: Spice[] = [];
    let error: string | null = null;
    try {
        blend = await fetchBlend(decodeURIComponent(name));

        if (blend) {
            if (blend.spices) {
                spices = await Promise.all(
                    blend.spices.map((spiceId) => fetchSpiceById(spiceId))
                ).then((results) =>
                    results.filter((spice): spice is Spice => !!spice)
                );
            }
            if (blend.blends) {
                relatedBlends = await Promise.all(
                    blend.blends.map((blendId) => fetchBlendById(blendId))
                ).then((results) =>
                    results.filter((blend): blend is Blend => !!blend)
                );
            }
        }
    } catch (err) {
        console.error("Failed to fetch blend", err);
        error = "Failed to load blend details.";
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

    const blendStructuredData: WithContext<Article> = {
        "@context": "https://schema.org",
        "@type": "Article",
        name: blend.name,
        description: `Learn about ${blend.name}, the spices that make it up and any related blends.`,
        articleBody: `The ${blend.name} is ${blend.description}`,
    };
    
    return (
        <>
            <Head>
                {blendStructuredData && (
                    <script type="application/ld+json">
                        {JSON.stringify(blendStructuredData)}
                    </script>
                )}
            </Head>
            <BlendInfo item={blend} spices={spices} blends={relatedBlends} />
        </>
    );
}
