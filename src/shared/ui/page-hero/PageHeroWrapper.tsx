"use client";

import { usePathname } from "next/navigation";
import PageHero from "./PageHero";

function formatSegment(segment: string) {
  if (!segment) return "";
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function PageHeroWrapper() {
  const pathname = usePathname();
  
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const title = formatSegment(segments[segments.length - 1]);
  const breadcrumb = ["Home", ...segments.map(formatSegment)];

  return <PageHero title={title} breadcrumb={breadcrumb} />;
}
