import { Metadata } from 'next';

import { DataTable } from '../../../components/datatable/data-table';
import { Auction } from '../../../lib/schema';
import { columns } from './columns';
import { getAuctions } from '@/app/firebase/dbServices';

export const metadata: Metadata = {
  title: 'Auctions',
  description: 'Auction Table.',
};

export default async function AuctionPage() {
  const auctions: Auction[] = await getAuctions();
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of Auction Vehicles!
            </p>
          </div>
        </div>
        <DataTable data={auctions} columns={columns} searchColumn="id" />
      </div>
    </>
  );
}

export const revalidate = 2; // 0 seconds
