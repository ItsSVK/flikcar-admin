import { Separator } from '@/components/ui/separator';
import { UserDetail } from './user-detail';
import { db } from '@/app/firebase/firebase';
import { collection, getDoc, doc } from 'firebase/firestore'; // Added 'doc' import
import { models } from '@/app/firebase/models';
import { User } from '../../../../lib/schema';
import { Metadata } from 'next';

export type UserDetailProps = { params: { id: string } };
export const metadata: Metadata = {
  title: 'User Details',
  description: 'User Details.',
};

export default async function UserDetailPage({ params }: UserDetailProps) {
  const user = (
    await getDoc(doc(collection(db, models.users), params.id))
  ).data() as User;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">User Details</h3>
        <p className="text-sm text-muted-foreground">
          Update your user details.
        </p>
      </div>
      <Separator />
      <UserDetail user={user} id={params.id} />
    </div>
  );
}
