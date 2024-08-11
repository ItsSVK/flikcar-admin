'use client';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

export default function SubmitButtonComponent({
  isPending,
  text,
}: {
  isPending: boolean;
  text: string;
}) {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className="disabled:bg-primary/100 flex gap-2 hover:bg-primary/90 min-w-40"
    >
      {isPending && <LoaderCircle className="animate-spin" />}
      {isPending ? 'Please wait...' : text}
    </Button>
  );
}
