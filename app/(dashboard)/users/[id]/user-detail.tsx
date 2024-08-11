'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, userSchema } from '../../../../lib/schema';
import { db } from '@/app/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { models } from '@/app/firebase/models';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile } from '@/actions/actions';

export function UserDetail({ user, id }: { user: User; id: string }) {
  const defaultValues: Partial<User> = {
    profile: {
      firstName: user.profile?.firstName,
      lastName: user.profile?.lastName,
    },
    userTypeStatus: user.userTypeStatus,
  };

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues,
    mode: 'onChange',
  });

  const router = useRouter();
  // const queryClient = useQueryClient();

  // const { mutate } = useMutation({
  //   mutationFn: updateUserProfile,
  //   onSuccess: () => {
  //     toast.success('Profile Data is Updated');
  //     // queryClient.invalidateQueries(['user', id]); // Invalidate and refetch user data if needed
  //     router.refresh(); // Optionally refresh the page or route
  //   },
  //   onError: error => {
  //     toast.error('An error occurred while updating the profile');
  //     console.error(error);
  //   },
  // });

  // const onSubmit = (data: User) => mutate({ data, id });

  async function onSubmit(data: User) {
    await setDoc(doc(db, models.users, id), data, { merge: true });
    toast.success('Profile Data is Updated');
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="profile.firstName"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profile.lastName"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="userTypeStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select User Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
                  <SelectItem value="DEALER_FORMS_SUBMITTED">
                    DEALER_FORMS_SUBMITTED
                  </SelectItem>
                  <SelectItem value="DEALER_REJECTED">
                    DEALER_REJECTED
                  </SelectItem>
                  <SelectItem value="DEALER">DEALER</SelectItem>
                  <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                  <SelectItem value="DELETED">DELETED</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
