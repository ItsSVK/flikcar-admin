import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <main className="flex flex-col justify-center items-center h-full">
      <h1 className="text-xl flex gap-3 justify-center items-center">
        <LoaderCircle className="animate-spin" /> Loading ...
      </h1>
    </main>
  );
}
