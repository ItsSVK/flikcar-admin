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
import { User, userSchema } from '../../../../../lib/schema';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';
import { models } from '@/app/firebase/models';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function DealerDetail({ user, id }: { user: User; id: string }) {
  const router = useRouter();

  const defaultValues: Partial<User> = {
    dealerOnboardFormData: {
      name: user.dealerOnboardFormData?.name,
      email: user.dealerOnboardFormData?.email,
      shopName: user.dealerOnboardFormData?.shopName,
      shopAddress: user.dealerOnboardFormData?.shopAddress,
      selectedState: user.dealerOnboardFormData?.selectedState,
      selectedCity: user.dealerOnboardFormData?.selectedCity,
      pinCode: user.dealerOnboardFormData?.pinCode,
      panCardNumber: user.dealerOnboardFormData?.panCardNumber,
      addressProofNumber: user.dealerOnboardFormData?.addressProofNumber,
      tradeLicenseNumber: user.dealerOnboardFormData?.tradeLicenseNumber,
      cancelledChequeNumber: user.dealerOnboardFormData?.cancelledChequeNumber,
    },
  };

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: User) {
    data.updatedAt = new Date().getTime();
    await setDoc(doc(db, models.users, id), data, { merge: true });
    toast.success('Dealer Data is Updated');
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="dealerOnboardFormData.name"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dealerOnboardFormData.email"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Email</FormLabel>
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
            name="dealerOnboardFormData.shopName"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Shop Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dealerOnboardFormData.selectedState"
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
        </div>
        <FormField
          control={form.control}
          name="dealerOnboardFormData.shopAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop Address</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="dealerOnboardFormData.selectedCity"
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
          <FormField
            control={form.control}
            name="dealerOnboardFormData.pinCode"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Pin Code</FormLabel>
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
            name="dealerOnboardFormData.panCardNumber"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>PAN Number</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dealerOnboardFormData.addressProofNumber"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Address Proof Number</FormLabel>
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
            name="dealerOnboardFormData.tradeLicenseNumber"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Trade License Number</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dealerOnboardFormData.cancelledChequeNumber"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>Cancelled Cheque Number</FormLabel>
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
