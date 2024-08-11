import { Separator } from '@/components/ui/separator';
// import { AccountForm } from '@/app/(app)/examples/forms/account/account-form';
// import { DealerDetail } from './dealer-detail';
import { User } from '../../../../../lib/schema';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';
import { models } from '@/app/firebase/models';
import { Metadata } from 'next';
import { ShopDetail } from './shop-detail';
import { UserDetailProps } from '../page';

export const metadata: Metadata = {
  title: 'Shop Details',
  description: 'Shop Details.',
};

export default async function ShopDetailPage({ params }: UserDetailProps) {
  const user = (
    await getDoc(doc(collection(db, models.users), params.id))
  ).data() as User;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Shop Details</h3>
        <p className="text-sm text-muted-foreground">Update Shop details.</p>
      </div>
      <Separator />
      <ShopDetail user={user} id={params.id} />
      {/* <DealerDetail user={user} id={params.id} /> */}
    </div>
  );
}
