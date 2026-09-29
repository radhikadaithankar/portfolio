import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Page not found | Radhika Daithankar",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Nav subpage />
      <main className="shell not-found">
        <p className="eyebrow">404 / Page not found</p>
        <h1>This page isn&apos;t here.</h1>
        <Link className="button button-dark" href="/#projects">
          Explore the projects <span aria-hidden="true">↗</span>
        </Link>
      </main>
    </>
  );
}
