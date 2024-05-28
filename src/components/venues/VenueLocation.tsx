import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useStore from '@/store/venueStore';
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const VenueLocationSchema = z.object({
  country: z.string().min(3).max(50),
  city: z.string().min(3).max(50),
  address: z.string().min(3).max(50),
  zip: z.string().min(3).max(10),
});

const VenueLocation = () => {
  const {
    setStoredForm,
    storedForm,
    setFormPhase,
    loading,
    createVenue,
    token,
    venueId,
    resetVenueId,
    user,
    updateProfile,
  } = useStore();
  const form = useForm<z.infer<typeof VenueLocationSchema>>({
    resolver: zodResolver(VenueLocationSchema),
    defaultValues: {
      country: storedForm.location.country || '',
      city: storedForm.location.city || '',
      address: storedForm.location.address || '',
      zip: storedForm.location.zip || '',
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && venueId) {
      navigate(`/venues/${venueId}`);
    }

    return () => {
      if (venueId) {
        resetVenueId();
      }
    };
  }, [venueId]);

  const onSubmit = async (values: z.infer<typeof VenueLocationSchema>) => {
    setStoredForm({ location: values });

    if (user?.venueManager) {
      createVenue(token, { ...storedForm, location: values });
    } else {
      const updated = {
        avatar: { url: user?.avatar.url ?? '', alt: user?.avatar.alt ?? '' },
        banner: { url: user?.banner.url ?? '', alt: user?.banner.alt ?? '' },
        bio: user?.bio,
        venueManager: true,
      };
      await updateProfile(token, user?.name, updated);
      createVenue(token, { ...storedForm, location: values });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-4 md:px-0"
      >
        <h1 className="mx-auto mb-8 max-w-[16ch] text-center text-lg">
          Finally, where is your venue located?
        </h1>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Country" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} placeholder="City" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Address" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ZIP</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ZIP" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setFormPhase('amenities')}
          >
            Previous
          </Button>
          <Button type="submit" className="w-full">
            Create {loading && <LoaderCircle size={20} />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VenueLocation;
