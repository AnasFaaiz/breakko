import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "About - Breakko",
  description:
    "Learn about Breakko - The simple, clean, and effective personal digital notice board for displaying your current status.",
  robots: "index, follow",
}

export default function AboutPage() {
  return <AboutPageClient />
}
