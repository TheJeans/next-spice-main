"use client";
import React, { useState, useEffect } from "react";
import { Blend } from "@/types/interfaces";
import Link from "next/link";
{
    /* 
ideal TODO: 
- get rid of this and make a reusable component for both spices and blends
I wrote more stuff in the SearchInput component
*/
}
interface SearchBlendsInputProps {
    initialBlends: Blend[];
}

const ITEMS_PER_PAGE = 9;

const SearchBlendsInput: React.FC<SearchBlendsInputProps> = ({
    initialBlends,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [blends, setBlends] = useState<Blend[]>(initialBlends);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const indexOfLastBlend = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstBlend = indexOfLastBlend - ITEMS_PER_PAGE;
    const currentBlends = blends.slice(indexOfFirstBlend, indexOfLastBlend);
    const totalPages = Math.ceil(blends.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setIsLoading(true);
        setError("");
        const timeoutId = setTimeout(() => {
            try {
                if (!inputValue) {
                    setBlends(initialBlends);
                } else {
                    const filteredBlends = initialBlends.filter((blend) =>
                        blend.name
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                    );
                    setBlends(filteredBlends);
                }
            } catch (e) {
                setError("Error filtering blends");
            } finally {
                setIsLoading(false);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [inputValue, initialBlends]);

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
                <div className="p-4 border-2 rounded-sm">
                    <h2 className="font-bold text-lg mb-3">Search Results</h2>
                    <label htmlFor="search-blends" className="sr-only">
                        Search Blends
                    </label>
                    <input
                        type="text"
                        id="search-blends"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search blends..."
                    />
                </div>
            </div>

            {/* ideal TODO: I'll put this elsewhere as a component */}
            <div
                className="w-full md:w-3/4"
                aria-live="polite"
                aria-atomic="true"
            >
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
                            {currentBlends.map((blend) => (
                                <li
                                    key={blend.name}
                                    className="flex flex-col border-t-2 border-r-2 p-4 h-28"
                                >
                                    <div className="flex">
                                        <Link
                                            href={`/blend/${encodeURIComponent(
                                                blend.name
                                            )}`}
                                            className="w-full h-full text-left text-xl font-semibold"
                                        >
                                            {blend.name}
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {totalPages > 1 && (
                            <section className="py-5 border-t-2 mt-5">
                                <div className="">
                                    <div className="flex flex-wrap items-center justify-between -m-2">
                                        <div className="order-2 sm:w-auto sm:order-1 p-2">
                                            <button
                                                className="inline-flex group items-center text-sm font-semibold"
                                                onClick={() =>
                                                    handlePageChange(
                                                        Math.max(
                                                            1,
                                                            currentPage - 1
                                                        )
                                                    )
                                                }
                                                disabled={currentPage === 1}
                                            >
                                                Prev
                                            </button>
                                        </div>

                                        {/* pg's */}
                                        <div className="order-1 w-full sm:w-auto p-2">
                                            <div className="flex items-center">
                                                {Array.from(
                                                    { length: totalPages },
                                                    (_, i) => i + 1
                                                )
                                                    .filter(
                                                        (page) =>
                                                            page === 1 ||
                                                            page ===
                                                                totalPages ||
                                                            (page >=
                                                                currentPage -
                                                                    2 &&
                                                                page <=
                                                                    currentPage +
                                                                        2)
                                                    )
                                                    .map((page, i, arr) => (
                                                        <React.Fragment
                                                            key={page}
                                                        >
                                                            {i > 0 &&
                                                                arr[i - 1] !==
                                                                    page -
                                                                        1 && (
                                                                    <span className="px-4 text-sm text-gray-400">
                                                                        ...
                                                                    </span>
                                                                )}
                                                            <button
                                                                onClick={() =>
                                                                    handlePageChange(
                                                                        page
                                                                    )
                                                                }
                                                                className={`px-4 text-sm font-semibold ${
                                                                    currentPage ===
                                                                    page
                                                                        ? "text-gray-100"
                                                                        : "text-gray-400"
                                                                } hover:text-gray-200`}
                                                            >
                                                                {page}
                                                            </button>
                                                        </React.Fragment>
                                                    ))}
                                            </div>
                                        </div>

                                        <div className="order-3 sm:w-auto p-2">
                                            <button
                                                className="inline-flex group items-center text-sm font-semibold"
                                                onClick={() =>
                                                    handlePageChange(
                                                        Math.min(
                                                            totalPages,
                                                            currentPage + 1
                                                        )
                                                    )
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchBlendsInput;
