"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, Circle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { pages } from "@/lib/pages";
import Link from "next/link";
import PageTitle from "./page-title";

export default function PageChange() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  useEffect(() => {
    const currentPathName = pathname.split("/")[pathname.split("/").length - 1];
    if (!currentPathName) {
      setCurrentPageIndex(0);
    } else {
      const currentIndex = pages.findIndex(
        (i) => i.href === `/${currentPathName}`,
      );
      setCurrentPageIndex(currentIndex);
    }
  }, [pathname]);

  const handlePrevPage = useCallback(() => {
    router.push(pages[currentPageIndex - 1].href);
  }, [currentPageIndex, router]);

  const handleNextPage = useCallback(() => {
    router.push(pages[currentPageIndex + 1].href);
  }, [currentPageIndex, router]);

  return (
    <div className="flex flex-col justify-between items-center h-full relative p-2 border-l-2">
      <PageTitle
        title={pages[currentPageIndex].label || ""}
        className="absolute right-full"
      />
      <div className="flex flex-col justify-center items-center gap-4">
        {pages.map((page, index) => (
          <div key={index} className="h-12 flex justify-center items-center">
            <Link href={page.href}>
              <Button variant="ghost">
                <Circle
                  size={40}
                  fill={index === currentPageIndex ? "black" : "none"}
                />
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex md:flex-col gap-4">
        <Button
          className="rounded-full aspect-square h-10 w-10"
          disabled={currentPageIndex == 0}
          onClick={handlePrevPage}
        >
          <ChevronUp />
        </Button>
        <Button
          className="rounded-full aspect-square h-10 w-10 bg-primary"
          disabled={currentPageIndex == pages.length - 1}
          onClick={handleNextPage}
        >
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
}
