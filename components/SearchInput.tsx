"use client";
import React, { useState, useEffect } from "react";
import { Spice } from "@/types/interfaces";
import Link from "next/link";
{/* 
ideal TODO: 
- Rename (or split) the component to be both for the filter and lists
- Make more filters (e.g. by heat, by price, etc.)
- seperate the filter and list into two components
- make this reusable for other lists
- pagination or scroll load would be cool
- I should do some sort or debounce on the search input
*/}
interface SearchInputProps {
    initialSpices: Spice[];
}

const SearchInput: React.FC<SearchInputProps> = ({ initialSpices }) => {
    const [inputValue, setInputValue] = useState("");
    const [spices, setSpices] = useState<Spice[]>(initialSpices);

    useEffect(() => {
        if (!inputValue) {
            setSpices(initialSpices);
            return;
        }

        const filteredSpices = initialSpices.filter((spice) =>
            spice.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSpices(filteredSpices);
    }, [inputValue, initialSpices]);

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
                <div className="p-4 border rounded-lg shadow">
                    <h2 className="font-bold text-lg mb-3">Search Results</h2>
                    <label htmlFor="search-spices" className="sr-only">Search Spices</label>
                    <input
                        type="text"
                        id="search-spices"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search spices..."
                    />
                </div>
            </div>

            {/* ideal TODO: I'll put this elsewhere as a component */}
            <div className="w-full md:w-3/4" aria-live="polite" aria-atomic="true">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
                    {spices.length > 0 ? (
                        spices.map((spice) => (
                            <li
                                key={spice.name}
                                className="flex flex-col border-t-2 border-r-2 p-4 h-28"
                            >
                                <div className="flex">
                                    <Link
                                        href={`/spice/${encodeURIComponent(
                                            spice.name
                                        )}`}
                                        className="w-full h-full text-left text-xl font-semibold"
                                    >
                                        {spice.name}
                                    </Link>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>
                            No spices found.
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SearchInput;
