import React from "react";

type Props = {};

function Banner({}: Props) {
    return (
        <section className="container mx-auto px-4 py-48 border-b-2 ">
            <div className="mb-5 flex items-center justify-center">
                <div>
                    <span className="text-lg text-left">Just one rule,</span>
                    <h1 className="relative text-5xl sm:text-7xl xl:text-9xl font-black font-heading">
                        <span className="">Keep it </span>
                        <span className="relative">
                            <span className="relative uppercase">spiceé.</span>
                            <span className="absolute -bottom-2 left-0 h-2.5 w-full bg-black rounded-full"></span>
                        </span>
                    </h1>
                </div>
            </div>
        </section>
    );
}

export default Banner;
