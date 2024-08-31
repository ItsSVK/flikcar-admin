import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import Image from 'next/image';

export function ImagePopup({ src }: { src: string | undefined | null }) {
  src = src ?? '/placeholder.svg';

  return (
    <Dialog>
      <DialogTitle></DialogTitle>
      <DialogTrigger asChild>
        <Image
          src={src as string}
          width={80}
          height={70}
          alt="Placeholder Image"
          className="cursor-zoom-in rounded-lg transition-all hover:scale-105"
          quality={100}
        />
      </DialogTrigger>
      <DialogContent className="p-0 max-w-[90vw] max-h-[90vh] bg-background">
        <div className="relative h-full w-full">
          <Image
            src={src as string}
            width={1200}
            height={800}
            alt="Placeholder Image"
            className="object-contain w-full h-full"
            quality={100}
            style={{ aspectRatio: '1200/800', objectFit: 'cover' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
