import Link from "next/link";
import React from "react";

type Props = {};

function SplitSectionWithLinks({}: Props) {
    return (
        <section className="container mx-auto px-4 py-10">
            <div className="flex flex-wrap -m-4">
                <div className="w-full md:w-1/2 p-4 border-r border-gray-300">
                    <div className="py-32 px-8 text-center h-full">
                        <Link href={"/spices"} className="text-2xl block">
                            Learn more about
                            <span className="block text-6xl font-bold">
                                SPICES
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-4">
                    <div className="py-32 px-8 text-center h-full">
                        <Link href={"/blends"} className="text-2xl block">
                            Learn more about
                            <span className="block text-6xl font-bold">
                                BLENDS
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SplitSectionWithLinks;
