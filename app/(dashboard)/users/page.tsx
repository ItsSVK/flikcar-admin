import { Metadata } from 'next';

import { DataTable } from '../../../components/datatable/data-table';
import { db } from '@/app/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { models } from '@/app/firebase/models';
import { User } from '../../../lib/schema';
import { columns } from './columns';
import { userStatuses } from '@/lib/enums';

export const metadata: Metadata = {
  title: 'Users',
  description: 'User Table.',
};

export default async function UserPage() {
  const users: User[] = (await getDocs(collection(db, models.users))).docs.map(
    doc => {
      return {
        id: doc.id,
        ...doc.data(),
      } as User;
    }
  );
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of Users!
            </p>
          </div>
        </div>
        <DataTable
          data={users}
          columns={columns}
          filterList={[
            {
              name: 'User Type Status',
              field: 'userTypeStatus',
              values: userStatuses,
            },
          ]}
          searchColumn="phone"
        />
      </div>
    </>
  );
}

export const revalidate = 2; // 0 seconds
