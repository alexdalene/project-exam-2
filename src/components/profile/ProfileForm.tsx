import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useStore from '@/store/venueStore';
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
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';

const ProfileFormSchema = z.object({
  avatar: z.string().url({ message: 'Avatar must be a valid URL' }),
  banner: z.string().url({ message: 'Banner must be a valid URL' }),
  bio: z.string().min(10, { message: 'Bio must be at least 10 characters' }),
});

const ProfileForm = () => {
  const { profile, updateProfile, token, profileLoading } = useStore();

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      avatar: profile?.avatar.url || '',
      banner: profile?.banner.url || '',
      bio: profile?.bio || '',
    },
  });

  const onSubmit = (values: z.infer<typeof ProfileFormSchema>) => {
    const updated = {
      avatar: { url: values.avatar, alt: 'Avatar' },
      banner: { url: values.banner, alt: 'Banner' },
      bio: values.bio,
    };

    updateProfile(token, profile?.name, updated);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input {...field} placeholder="URL" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="banner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Banner" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Bio" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            Save changes
            {profileLoading && (
              <LoaderCircle size={20} className="animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
