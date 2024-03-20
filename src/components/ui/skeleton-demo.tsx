import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonDemo() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 justify-center !mb-5">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[220px]" />
            <Skeleton className="h-4 w-[170px]" />
          </div>
        </div>
      ))}
    </>
  );
}
