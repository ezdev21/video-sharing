import { Skeleton } from "@/components/ui/skeleton"

export function VideoCardSkeleton() {
  return (
    <div className="cursor-pointer">
      {/* Thumbnail skeleton */}
      <div className="relative rounded-md overflow-hidden">
        <Skeleton className="w-full aspect-video rounded-md" />

        {/* Duration badge skeleton */}
        <div className="absolute bottom-1 right-1">
          <Skeleton className="h-4 w-10 rounded-sm" />
        </div>
      </div>

      {/* Info skeleton */}
      <div className="flex gap-3 mt-2 items-center">
        {/* Avatar */}
        <Skeleton className="w-10 h-10 rounded-full" />

        <div className="flex-1 space-y-2">
          {/* Title (2 lines) */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />

          {/* Channel name */}
          <Skeleton className="h-3 w-1/3" />

          {/* Views + time */}
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  )
}
