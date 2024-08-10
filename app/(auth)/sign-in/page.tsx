'use client';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/app/firebase/firebase';

const signInFormSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;
const defaultValues: Partial<SignInFormValues> = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const router = useRouter();
  const searchParam = '';
  // typeof window !== 'undefined'
  //   ? new URLSearchParams(window.location.search).get('redirect')
  //   : null;

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues,
  });

  async function onSubmit(data: SignInFormValues) {
    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        data.email,
        data.password
      );

      const idToken = await credential.user.getIdToken();

      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      toast.success('Login successful!');

      router.push(searchParam || '/dashboard');
    } catch (e) {
      toast.error('Login failed!', {
        description: 'Please check your credentials and try again.',
      });
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign in</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </Suspense>
  );
}
