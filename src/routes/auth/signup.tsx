import { Link, useNavigate } from 'react-router-dom';

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
import { Helmet } from 'react-helmet';

const AuthSignupSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' }),
  email: z
    .string()
    .email()
    .endsWith('stud.noroff.no', { message: 'You must use a student email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

const AuthSignup = () => {
  const { signup, userLoading, userSuccess } = useStore();
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);

  const form = useForm<z.infer<typeof AuthSignupSchema>>({
    resolver: zodResolver(AuthSignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof AuthSignupSchema>) => {
    signup(values);
    setIsSent(true);
  };

  useEffect(() => {
    if (userSuccess && !userLoading && isSent) {
      navigate('/auth', { state: { email: form.getValues().email } });
    }
  }, [userSuccess, userLoading, isSent]);

  return (
    <>
      <Helmet>
        <title>Holidaze | Sign up</title>
        <meta
          name="description"
          content="Create an account to access all the features of the app."
        />
      </Helmet>

      <Card className="max-w-[360px]">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Create an account to access all the features of the app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Name"
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
                  Sign up
                  {userLoading && (
                    <LoaderCircle size={20} className="animate-spin" />
                  )}
                </Button>
                <div className="text-sm">
                  Already have an account?{' '}
                  <Link to="/auth" className="underline">
                    Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AuthSignup;
