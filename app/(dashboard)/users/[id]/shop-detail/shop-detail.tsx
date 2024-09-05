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

import { models } from '@/app/firebase/models';
import { toast } from 'sonner';
import { User, userSchema } from '@/lib/schema';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserProfileData, updateUserProfileData } from '@/actions/actions';
import SubmitButton from '@/components/custom/SubmitButton';

export function ShopDetail({ user, id }: { user: User; id: string }) {
  const router = useRouter();
  const defaultValues: Pick<User, 'shop'> = {
    shop: {
      name: user.shop?.name ?? '',
      phone: user.shop?.phone ?? '',
      gstNumber: user.shop?.gstNumber ?? '',
      addresses: user.shop?.addresses ?? [],
    },
  };

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { data: userProfile, isPending: isDataFetchPending } = useQuery({
    queryKey: [models.users],
    queryFn: async () => await getUserProfileData(id),
    enabled: false,
  });

  const { mutate, isPending: isDataSubmitPending } = useMutation({
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

  async function onSubmit(data: User) {
    if (userProfile && data.shop)
      data.shop.name = userProfile.dealerOnboardFormData?.shopName;
    mutate({ data, id });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="shop.phone"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Shop Phone No</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shop.gstNumber"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>GST No</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="shop.addresses.0.addressLine1"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shop.addresses.0.addressLine2"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Address Line 2</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="shop.addresses.0.addressLine3"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Address Line 3</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shop.addresses.0.city"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="shop.addresses.0.state"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shop.addresses.0.postalCode"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SubmitButton
          isPending={isDataFetchPending && isDataSubmitPending}
          text="Update Profile"
        />
      </form>
    </Form>
  );
}
