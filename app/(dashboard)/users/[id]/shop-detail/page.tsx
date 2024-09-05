import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { ShopDetail } from './shop-detail';
import { UserDetailProps } from '../page';
import { getUser } from '@/app/firebase/dbServices';
import { User } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Shop Details',
  description: 'Shop Details.',
};

export default async function ShopDetailPage({ params }: UserDetailProps) {
  const user = (await getUser(params.id)) as User;

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
