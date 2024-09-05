import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { UserDetailProps } from '../page';
import { User } from '@/lib/schema';
import { getUser } from '@/app/firebase/dbServices';
const ImageCardWithForm = dynamic(() => import('./images'), {
  ssr: false,
});

const types = [
  'pan',
  'addressProofFront',
  'addressProofBack',
  'tradeLicense',
  'cancelledCheque',
  'shop',
];

type DocsImagePaths = {
  type: string;
  path: string;
};

export default async function Image({ params }: UserDetailProps) {
  const user = (await getUser(params.id)) as User;

  if (!user) return redirect('/users');

  const docsImagePaths: DocsImagePaths[] = [];

  types.forEach(type => {
    docsImagePaths.push({ type, path: '' });
    if (
      user.dealerOnboardFormData &&
      user.dealerOnboardFormData.docsImagePaths
    ) {
      if (
        user.dealerOnboardFormData.docsImagePaths.find(obj => obj.type === type)
      ) {
        docsImagePaths.pop();
        docsImagePaths.push(
          user.dealerOnboardFormData.docsImagePaths.find(
            obj => obj.type === type
          ) as DocsImagePaths
        );
      }
    }
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {types.map(type => (
        <ImageCardWithForm
          key={type}
          docsImagePaths={
            docsImagePaths.find(
              (obj: DocsImagePaths) => obj.type === type
            ) as DocsImagePaths
          }
          userId={params.id}
        />
      ))}
    </div>
  );
}
