import { Metadata } from 'next';
import { ComingSoon } from '@/components/page/ComingSoon';

export type AuctionBIDProps = { params: { id: string } };
export const metadata: Metadata = {
  title: 'Auction BIDs',
  description: 'Auction BIDs.',
};

export default async function AuctionBIDPage({ params }: AuctionBIDProps) {
  return <ComingSoon />;
}
