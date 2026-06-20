import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "./components/Toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = { title: "Supenli.ai — Create Viral Content in Seconds", description: "Stop spending 2 hours on a single post. Generate 5 viral variations in 30 seconds — for LinkedIn, Instagram, TikTok, X, YouTube & Facebook. AI-powered with anti-AI protocol, infographics, style memory and RAG." };
export default function RootLayout({ children }: { children: React.ReactNode }) { return (<html lang="en" className={inter.variable}><body className="font-sans antialiased bg-white text-zinc-900">{children}<Toaster /></body></html>); }