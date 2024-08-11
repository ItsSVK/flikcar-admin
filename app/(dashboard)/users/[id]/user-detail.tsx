'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
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
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { updateUserProfileData } from '@/actions/actions';
import SubmitButton from '@/components/custom/SubmitButton';

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

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfileData,
    onSuccess: () => {
      toast.success('Profile Data is Updated');
      router.refresh();
    },
    onError: error => {
      toast.error('An error occurred while updating the profile');
      console.error(error);
    },
  });

  const onSubmit = (data: User) => mutate({ data, id });

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
        <SubmitButton isPending={isPending} text="Update Profile" />
      </form>
    </Form>
  );
}
