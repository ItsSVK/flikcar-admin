'use client';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ButtonComponent({
  content,
  link,
}: {
  content: string;
  link: string;
}) {
  const router = useRouter();
  return (
    <Button size="sm" onClick={() => router.push(link)} className="gap-2">
      <PlusCircle className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        {content}
      </span>
    </Button>
  );
}
