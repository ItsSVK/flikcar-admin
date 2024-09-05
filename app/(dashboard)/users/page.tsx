import { Metadata } from 'next';

import { DataTable } from '../../../components/datatable/data-table';
import { User } from '../../../lib/schema';
import { columns } from './columns';
import { userStatuses } from '@/lib/enums';
import { getUsers } from '@/app/firebase/dbServices';

export const metadata: Metadata = {
  title: 'Users',
  description: 'User Table.',
};

export default async function UserPage() {
  const users: User[] = await getUsers();
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
