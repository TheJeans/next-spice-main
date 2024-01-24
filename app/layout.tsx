import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Interview Spice",
    description: "All the greatest spices",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <a href="#mainContent" className="skip-link sr-only">
                    Skip to content
                </a>

                <Nav />
                <main id="mainContent">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
