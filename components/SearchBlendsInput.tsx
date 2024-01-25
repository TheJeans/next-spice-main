"use client";
import React, { useState, useEffect } from 'react';
import { Blend } from "@/types/interfaces";
import Link from "next/link";
{/* 
ideal TODO: 
- get rid of this and make a reusable component for both spices and blends
I wrote more stuff in the SearchInput component
*/}
interface SearchBlendsInputProps {
    initialBlends: Blend[];
}

const SearchBlendsInput: React.FC<SearchBlendsInputProps> = ({ initialBlends }) => {
    const [inputValue, setInputValue] = useState('');
    const [blends, setBlends] = useState<Blend[]>(initialBlends);

    useEffect(() => {
        if (!inputValue) {
            setBlends(initialBlends);
            return;
        }
        const filteredBlends = initialBlends.filter(blend =>
            blend.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setBlends(filteredBlends);
    }, [inputValue, initialBlends]);

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
                <div className="p-4 border rounded-lg shadow">
                    <h2 className="font-bold text-lg mb-3">Search Results</h2>
                    <label htmlFor="search-spices" className="sr-only">Search Blends</label>
                    <input
                        type="text"
                        id="search-spices"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search blends..."
                    />
                </div>
            </div>

            {/* ideal TODO: I'll put this elsewhere as a component */}
            <div className="w-full md:w-3/4" aria-live="polite" aria-atomic="true">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
                    {blends.length > 0 ? (
                        blends.map((blend) => (
                            <li
                                key={blend.name}
                                className="flex flex-col border-t-2 border-r-2 p-4 h-28"
                            >
                                <div className="flex">
                                    <Link
                                        href={`/spice/${encodeURIComponent(
                                            blend.name
                                        )}`}
                                        className="w-full h-full text-left text-xl font-semibold"
                                    >
                                        {blend.name}
                                    </Link>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>
                            No blends found.
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SearchBlendsInput;
