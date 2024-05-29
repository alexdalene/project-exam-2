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
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useStore from '@/store/venueStore';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

export const VenueInfoSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(150, { message: 'Title must be at most 50 characters long' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(355, { message: 'Description must be at most 255 characters long' }),
  price: z.union([
    z
      .number()
      .int()
      .positive()
      .min(100, { message: 'Price must be at least 100' })
      .max(5000, { message: 'Price must be at most 5000' }),
    z.literal(''),
  ]),
  maxGuests: z.union([
    z
      .number()
      .int()
      .positive()
      .min(1, { message: 'Guests must be at least 1' })
      .max(50, { message: 'Guests must be at most 50' }),
    z.literal(''),
  ]),
  rating: z.number().min(0).max(5).optional().default(0),
});

const VenueInfo = () => {
  const { setStoredForm, setFormPhase, storedForm, setFormIsDone } = useStore();
  const form = useForm<z.infer<typeof VenueInfoSchema>>({
    resolver: zodResolver(VenueInfoSchema),
    defaultValues: {
      name: storedForm.name || '',
      description: storedForm.description || '',
      price: storedForm.price || '',
      maxGuests: storedForm.maxGuests || '',
      rating: storedForm.rating || 0,
    },
  });

  const onSubmit = (values: z.infer<typeof VenueInfoSchema>) => {
    setStoredForm(values);
    setFormPhase('images');
    setFormIsDone('info');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-4 md:px-0"
      >
        <h1 className="mx-auto mb-8 max-w-[16ch] text-center text-lg">
          Let's start with the basic stuff
        </h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Title" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Description"
                  className="rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Price"
                  type="number"
                  min="100"
                  max="5000"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxGuests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guests</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Guests"
                  type="number"
                  min="1"
                  max="50"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <StarRating
                  currentRating={field.value}
                  onRatingSelected={(rating) => field.onChange(rating)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 flex justify-end gap-2">
          <Link to="..">
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="w-full">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VenueInfo;
