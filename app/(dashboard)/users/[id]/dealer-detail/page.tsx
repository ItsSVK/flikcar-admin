import { Separator } from '@/components/ui/separator';
// import { AccountForm } from '@/app/(app)/examples/forms/account/account-form';
import { DealerDetail } from './dealer-detail';
import { User } from '../../../../../lib/schema';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';
import { models } from '@/app/firebase/models';
import { UserDetailProps } from '../page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dealer Details',
  description: 'Dealer Details.',
};
export default async function UserDetailPage({ params }: UserDetailProps) {
  const user = (
    await getDoc(doc(collection(db, models.users), params.id))
  ).data() as User;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Dealer Details</h3>
        <p className="text-sm text-muted-foreground">Update dealer details.</p>
      </div>
      <Separator />
      <DealerDetail user={user} id={params.id} />
    </div>
  );
}
