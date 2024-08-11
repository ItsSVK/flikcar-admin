'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { db } from '@/app/firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { models } from '@/app/firebase/models';
import { toast } from 'sonner';
import { User, userSchema } from '@/lib/schema';
import { useRouter } from 'next/navigation';

export function ShopDetail({ user, id }: { user: User; id: string }) {
  const router = useRouter();
  const defaultValues: Partial<User> = {
    shop: {
      name: user.shop?.name,
      phone: user.shop?.phone,
      gstNumber: user.shop?.gstNumber,
      addresses: user.shop?.addresses,
    },
  };

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: User) {
    const user = (await getDoc(doc(db, models.users, id))).data();
    if (!user) return;
    if (data.shop) {
      data.shop.name = user.dealerOnboardFormData?.shopName;
      data.updatedAt = new Date().getTime();
      await setDoc(doc(db, models.users, id), data, { merge: true });
    }
    toast.success('Profile Data is Updated');
    router.refresh();
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
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
