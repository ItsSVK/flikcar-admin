'use client';
import { Button } from '@/components/ui/button';
import { CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { models } from '@/app/firebase/models';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/schema';
import SubmitButton from '@/components/custom/SubmitButton';

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine(files => files?.length, 'Please select a file')
    .refine(
      type => type?.[0]?.type.startsWith('image/'),
      'File type not supported, only images are allowed'
    ),
});

type DocsImagePaths = { type?: string; path?: string };

export default function ({
  docsImagePaths,
  userId,
}: {
  docsImagePaths: DocsImagePaths;
  userId: string;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const storage = getStorage();
  const { path, type } = docsImagePaths;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const user = (await getDoc(doc(db, models.users, userId))).data() as User;
    if (!user) return;

    const file = data.file[0];
    const storageRef = ref(
      storage,
      `user_documents/${userId}/${Date.now()}_${file.name}`
    );
    const uploadedFile = await uploadBytes(storageRef, file);
    const path = await getDownloadURL(uploadedFile.ref);

    if (user) {
      if (user.dealerOnboardFormData) {
        if (user.dealerOnboardFormData.docsImagePaths) {
          const existingObject = user.dealerOnboardFormData.docsImagePaths.find(
            (obj: DocsImagePaths) => obj.type === type
          );
          if (existingObject) {
            existingObject.path = path;
          } else {
            user.dealerOnboardFormData.docsImagePaths.push({ path, type });
          }
        } else {
          user.dealerOnboardFormData.docsImagePaths = [{ path, type }];
        }
      } else {
        user.dealerOnboardFormData = { docsImagePaths: [{ path, type }] };
      }
      user.updatedAt = new Date().getTime();
      await setDoc(doc(db, models.users, userId), user, { merge: true });

      form.reset();

      toast.success('File uploaded successfully');
    } else {
      toast.error('User not found');
    }
    router.refresh();
  };

  return (
    <CardHeader className="w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      {type &&
                        type
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, str => str.toUpperCase())}{' '}
                      Photo
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...form.register('file')}
                        accept="image/*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
          <CardFooter className="flex gap-3 ">
            <Button
              type="button"
              disabled={path == ''}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.open(path, '_blank')}
            >
              View
            </Button>
            <SubmitButton isPending={false} text="Upload" />
          </CardFooter>
        </form>
      </Form>
    </CardHeader>
  );
}
