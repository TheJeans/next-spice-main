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

const ITEMS_PER_PAGE = 9; 

const SearchInput: React.FC<SearchInputProps> = ({ initialSpices }) => {
    const [inputValue, setInputValue] = useState("");
    const [spices, setSpices] = useState<Spice[]>(initialSpices);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const indexOfLastSpice = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstSpice = indexOfLastSpice - ITEMS_PER_PAGE;
    const currentSpices = spices.slice(indexOfFirstSpice, indexOfLastSpice);
    const totalPages = Math.ceil(spices.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        setIsLoading(true);
        setError('');
        const timeoutId = setTimeout(() => {
            try {
                if (!inputValue) {
                    setSpices(initialSpices);
                } else {
                    const filteredSpices = initialSpices.filter((spice) =>
                        spice.name.toLowerCase().includes(inputValue.toLowerCase())
                    );
                    setSpices(filteredSpices);
                }
            } catch (e) {
                setError('Error filtering spices');
            } finally {
                setIsLoading(false);
            }
        }, 500); 

        return () => clearTimeout(timeoutId);
    }, [inputValue, initialSpices]);


    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
                <div className="p-4 border-2 rounded-sm">
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
            {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
                        {currentSpices.map((spice) => (
                            <li key={spice.name} className="flex flex-col border-t-2 border-r-2 p-4 h-28">
                                <div className="flex">
                                    <Link
                                        href={`/spice/${encodeURIComponent(spice.name)}`}
                                        className="w-full h-full text-left text-xl font-semibold"
                                    >
                                        {spice.name}
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
                                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Prev
                                        </button>
                                    </div>
                    
                                    {/* pg's */}
                                    <div className="order-1 w-full sm:w-auto p-2">
                                        <div className="flex items-center">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                                .filter(page => 
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 2 && page <= currentPage + 2)
                                                )
                                                .map((page, i, arr) => (
                                                    <React.Fragment key={page}>
                                                        {i > 0 && arr[i - 1] !== page - 1 && (
                                                            <span className="px-4 text-sm text-gray-400">...</span>
                                                        )}
                                                        <button
                                                            onClick={() => handlePageChange(page)}
                                                            className={`px-4 text-sm font-semibold ${currentPage === page ? 'text-gray-100' : 'text-gray-400'} hover:text-gray-200`}
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
                                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
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

export default SearchInput;
