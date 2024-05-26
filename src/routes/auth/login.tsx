import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useStore from '@/store/venueStore';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const AuthLoginSchema = z.object({
  email: z
    .string()
    .email()
    .endsWith('stud.noroff.no', { message: 'You must use a student email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

const AuthLogin = () => {
  const { login, userLoading, userSuccess, user } = useStore();
  const navigate = useNavigate();
  const location = useLocation() as { state: { email: string } };
  const { email } = location.state || '';
  const [isSent, setIsSent] = useState(false);

  const form = useForm<z.infer<typeof AuthLoginSchema>>({
    resolver: zodResolver(AuthLoginSchema),
    defaultValues: {
      email: email || '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof AuthLoginSchema>) => {
    login(values);
    setIsSent(true);
  };

  useEffect(() => {
    if (userSuccess && !userLoading && isSent) {
      navigate(`/profile/${user?.name}`);
    }
  }, [userSuccess, userLoading, isSent]);

  return (
    <Card className="max-w-[360px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      required
                    />
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
                      type="password"
                      placeholder="Password"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit">
                Login
                {userLoading && (
                  <LoaderCircle size={20} className="animate-spin" />
                )}
              </Button>
              <div className="text-sm">
                Don't have an account?{' '}
                <Link to="/auth/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AuthLogin;
