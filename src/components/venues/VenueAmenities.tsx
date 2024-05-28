import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useStore from '@/store/venueStore';

const VenueAmenitiesSchema = z.object({
  meta: z.object({
    wifi: z.boolean(),
    parking: z.boolean(),
    breakfast: z.boolean(),
    pets: z.boolean(),
  }),
});

type VenueAmenitiesFormValues = z.infer<typeof VenueAmenitiesSchema>;

const VenueAmenities = () => {
  const { setStoredForm, setFormPhase, storedForm, setFormIsDone } = useStore();
  const form = useForm<VenueAmenitiesFormValues>({
    resolver: zodResolver(VenueAmenitiesSchema),
    defaultValues: {
      meta: {
        wifi: storedForm.meta?.wifi || false,
        parking: storedForm.meta?.parking || false,
        breakfast: storedForm.meta?.breakfast || false,
        pets: storedForm.meta?.pets || false,
      },
    },
  });

  const { handleSubmit, setValue } = form;
  const selectedAmenities = form.watch('meta');

  const handleToggle = (amenity: keyof typeof selectedAmenities) => {
    setValue(`meta.${amenity}`, !selectedAmenities[amenity]); // Toggle boolean value
  };

  const onSubmit = (values: VenueAmenitiesFormValues) => {
    setStoredForm({ ...storedForm, meta: values.meta });
    setFormPhase('location');
    setFormIsDone('amenities');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 px-4 md:px-0"
      >
        <h1 className="mx-auto mb-8 max-w-[16ch] text-center text-lg">
          Nice, let's see what's included
        </h1>
        <FormItem>
          <FormLabel>Amenities</FormLabel>
          <FormControl>
            <ToggleGroup
              type="multiple"
              className="flex-nowrap"
              defaultValue={Object.keys(selectedAmenities).filter(
                // @ts-expect-error - Type 'string' cannot be used to index type 'VenueAmenitiesFormValues'.
                (key) => selectedAmenities[key],
              )}
            >
              {Object.entries(selectedAmenities).map(([key, value]) => (
                <ToggleGroupItem
                  key={key}
                  value={key}
                  onClick={() =>
                    handleToggle(key as keyof typeof selectedAmenities)
                  }
                  className={`h-20 w-full border ${value ? 'selected' : ''}`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FormControl>
          <FormDescription>
            Select all the amenities that your venue offers.
          </FormDescription>
        </FormItem>

        <div className="flex justify-between gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setFormPhase('images')}
          >
            Previous
          </Button>
          <Button type="submit" className="w-full">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VenueAmenities;
