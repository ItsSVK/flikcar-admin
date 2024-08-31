import { Separator } from '@/components/ui/separator';
import { db } from '@/app/firebase/firebase';
import { collection, getDoc, doc } from 'firebase/firestore'; // Added 'doc' import
import { models } from '@/app/firebase/models';
import { Auction, User } from '../../../../lib/schema';
import { Metadata } from 'next';

export type AuctionBIDProps = { params: { id: string } };
export const metadata: Metadata = {
  title: 'Auction BIDs',
  description: 'Auction BIDs.',
};

export default async function AuctionBIDPage({ params }: AuctionBIDProps) {
  const user = (
    await getDoc(doc(collection(db, models.users), params.id))
  ).data() as Auction;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Auction BIDs Details</h3>
        {/* <p className="text-sm text-muted-foreground">
          Update your user details.
        </p> */}
      </div>
      <Separator />
    </div>
  );
}
