import { Separator } from '@/components/ui/separator';
import { DealerDetail } from './dealer-detail';
import { User } from '../../../../../lib/schema';
import { UserDetailProps } from '../page';
import { Metadata } from 'next';
import { getUser } from '@/app/firebase/dbServices';

export const metadata: Metadata = {
  title: 'Dealer Details',
  description: 'Dealer Details.',
};
export default async function UserDetailPage({ params }: UserDetailProps) {
  const user = (await getUser(params.id)) as User;

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
