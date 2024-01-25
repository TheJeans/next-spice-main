"use client";
import { Blend, Spice } from "@/types/interfaces";
import React from "react";

interface BlendInfoProps {
    item: Blend;
    spices: Spice[];
    blends: Blend[];
}

function BlendInfo({ item, spices, blends }: BlendInfoProps) {
    return (
        <section className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 mx-auto">
                <div className="mx-auto max-w-[1000px]">
                    <div className="flex flex-wrap mb-8 -mx-4">
                        <div className="w-full p-4">
                            <div className="">
                                <h1
                                    className="font-bold text-5xl mb-5 font-heading"
                                    data-testid="blend-name"
                                >
                                    {item.name}
                                </h1>
                                <p
                                    className="mb-10 text-xl"
                                    data-testid="blend-description"
                                >
                                    {item.description}
                                </p>
                                {item.spices.length > 0 && (
                                    <>
                                        <h2 className="text-3xl font-semibold">
                                            Spices in this Blend:
                                        </h2>
                                        <ul
                                            aria-label={`Spices in ${item.name} blend`}
                                            data-testid="blend-spices-list"
                                        >
                                            {spices.map((spice) => (
                                                <li key={spice.id}>
                                                    {spice.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {item.blends.length > 0 && (
                                    <>
                                        <h2 className="text-3xl font-semibold">
                                            Other Blends:
                                        </h2>
                                        <ul
                                            aria-label="Other blends"
                                            data-testid="other-blends-list"
                                        >
                                            {blends.map((blend) => (
                                                <li key={blend.id}>
                                                    {blend.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* some other pretend info could go here
            or even have a back and forth button to go to the next or previous spice
            also one to go to blends that it's found in could be cool too. */}
                </div>
            </div>
        </section>
    );
}

export default BlendInfo;
