"use client";

import service, { PhotoGetSearchParams } from "@/lib/service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ComponentProps, forwardRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FeeedEmpty } from "./feed-empty";
import { FeedItem } from "./feed-item";
import { FeedLoader } from "./feed-loader";
import { FeedSkeleton } from "./feed-skeleton";

const DEAFULT_PAGE_SIZE = 9;

export type FeedProps = ComponentProps<"div"> & {
  username?: PhotoGetSearchParams["user"];
};

const Feed = forwardRef<HTMLDivElement, FeedProps>(({ username = 0, ...props }, ref) => {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: ({ pageParam = 1 }) =>
      service.photo.get(
        { page: pageParam, user: username },
        { cache: "no-store", expectToken: true },
      ),
    getNextPageParam: (lastPage, allPages) => {
      const isLastPage = lastPage.data.length < DEAFULT_PAGE_SIZE;
      if (isLastPage) return undefined;
      return allPages.length + 1;
    },
  });

  const { ref: viewRef, inView } = useInView({ threshold: 1, initialInView: false });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (!data) return <FeedSkeleton count={DEAFULT_PAGE_SIZE} />;

  if (!data?.pages?.some((page) => page.data.length)) return <FeeedEmpty />;

  return (
    <>
      <div {...props} ref={ref} className="space-y-4">
        {data?.pages.map((page, index) => (
          <ul key={index} className="not-prose grid lg:grid-cols-3 gap-4 grid-cols-1">
            {page.data.map((photo) => (
              <li
                key={photo.id}
                className="not-prose list-none lg:[&:nth-child(2)]:col-start-2 lg:[&:nth-child(2)]:col-end-4 lg:[&:nth-child(2)]:row-span-2"
              >
                <FeedItem photo={photo} />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div ref={viewRef} className="invisible" aria-hidden></div>
      <div className="h-28 grid place-content-center" aria-hidden>
        {hasNextPage && isFetchingNextPage ? (
          <FeedLoader />
        ) : (
          <p className="text-zinc-400">Não existem mais postagens.</p>
        )}
      </div>
    </>
  );
});

Feed.displayName = "Feed";

export { Feed };
