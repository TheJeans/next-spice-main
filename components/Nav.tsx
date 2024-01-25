/* 
totally not perfect since I am basically having both navs on the page at the same time.
But I had to cut time in some places so i chose here.
*/
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

type Props = {};

function Nav({}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    // Toggles the mobile menu open/close state
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    // Disables scrolling when the mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Ensures you can scroll again when the menu is closed
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <section className="container mx-auto border-b-2 relative">
            {/* Main nav bar */}
            <nav className="py-7 px-4" aria-label="Main navigation">
                <div className="flex justify-between">
                    {/* Site / Logo link */}
                    <Link
                        href="/"
                        className="text-2xl tracking-tight font-bold hover:text-opacity-80 transition duration-200"
                    >
                        Spiceé.
                    </Link>
                    {/* Desktop nav links */}
                    <div className="hidden lg:flex gap-7">
                        <Link
                            href="/spices"
                            className="text-lg tracking-tight font-semibold hover:text-opacity-80 transition duration-200"
                        >
                            Spices
                        </Link>
                        <Link
                            href="/blends"
                            className="text-lg tracking-tight font-semibold hover:text-opacity-80 transition duration-200"
                        >
                            Blends
                        </Link>
                    </div>
                    {/* Hamburger menu button for mobile */}
                    <button
                        className={`navbar-burger lg:hidden ${
                            isOpen ? "open" : ""
                        }`}
                        onClick={toggleNavbar}
                        aria-label={isOpen ? "Close Menu" : "Open Menu"}
                        aria-expanded={isOpen ? "true" : "false"}
                        aria-controls="mobile-menu"
                    >
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </button>
                </div>
            </nav>
            {/* Mobile nav menu */}
            <div
                id="mobile-menu"
                className={`lg:hidden fixed top-0 left-0 w-full bg-white z-50 transition-transform transform ${
                    isOpen
                        ? "translate-y-0 transition duration-500"
                        : "-translate-y-full transition duration-500"
                }`}
                style={{
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <div className="p-4 flex flex-col items-center justify-center">
                    {/* Mobile nav links */}
                    <Link
                        href="/spices"
                        className="block text-7xl tracking-tight font-semibold hover:text-opacity-80 transition duration-200 py-20"
                    >
                        Spices
                    </Link>
                    <Link
                        href="/blends"
                        className="block text-7xl tracking-tight font-semibold hover:text-opacity-80 transition duration-200 py-20"
                    >
                        Blends
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Nav;
