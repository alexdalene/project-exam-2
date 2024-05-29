import { VenueAmenitiesSchema } from '@/components/create/VenueAmenities';
import { VenueImagesSchema } from '@/components/create/VenueImages';
import { VenueLocationSchema } from '@/components/create/VenueLocation';
import { VenueInfoSchema } from '@/components/create/VenueInfo';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { LoaderCircle, Trash } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import useStore from '@/store/venueStore';
import { ScrollArea } from '@/components/ui/scroll-area';

export const VenueEditSchema = z.object({
  info: VenueInfoSchema,
  images: VenueImagesSchema,
  amenities: VenueAmenitiesSchema,
  location: VenueLocationSchema,
});

const VenueEditForm = ({ venueId }: { venueId: string }) => {
  const { venue, updateVenue, token, loading, fetchSingleVenue } = useStore();
  const form = useForm<z.infer<typeof VenueEditSchema>>({
    resolver: zodResolver(VenueEditSchema),
    defaultValues: {
      info: {
        name: venue?.name || '',
        description: venue?.description || '',
        price: venue?.price || '',
        maxGuests: venue?.maxGuests || '',
      },
      images: {
        media: venue?.media || [{ url: '', alt: '' }],
      },
      amenities: {
        meta: {
          wifi: venue?.meta?.wifi || false,
          parking: venue?.meta?.parking || false,
          breakfast: venue?.meta?.breakfast || false,
          pets: venue?.meta?.pets || false,
        },
      },
      location: {
        country: venue?.location?.country || '',
        city: venue?.location?.city || '',
        address: venue?.location?.address || '',
        zip: venue?.location?.zip || '',
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'images.media',
  });

  const onSubmit = async (values: z.infer<typeof VenueEditSchema>) => {
    const { info, images, amenities, location } = values;
    await updateVenue(token, venueId, {
      ...info,
      media: images.media,
      meta: amenities.meta,
      location,
    });
    fetchSingleVenue(venueId);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="info">
          <div className="flex justify-center p-4">
            <TabsList>
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="info" className="space-y-4 p-4">
            <FormField
              control={form.control}
              name="info.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="info.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="rounded-xl" />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="info.price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      min="100"
                      max="5000"
                      type="number"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="info.maxGuests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guests</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      min="1"
                      type="number"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="images" className="space-y-4 p-4">
            <div className="flex flex-row-reverse">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                size="sm"
                onClick={() => append({ url: '', alt: '' })}
                disabled={fields.length >= 4}
              >
                Add more images
              </Button>
            </div>

            <ScrollArea className="h-72 w-full rounded-xl border">
              <div className="space-y-4 p-4">
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`images.media.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">
                          Image {index + 1}
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              {index + 1}
                            </span>
                            <Input
                              value={field.value.url}
                              name={`media.${index}.url`}
                              placeholder="URL"
                              type="text"
                              onChange={(e) =>
                                field.onChange({
                                  ...field.value,
                                  url: e.target.value,
                                })
                              }
                            />
                            <Input
                              value={field.value.alt}
                              name={`media.${index}.alt`}
                              placeholder="Describe the image"
                              type="text"
                              onChange={(e) =>
                                field.onChange({
                                  ...field.value,
                                  alt: e.target.value,
                                })
                              }
                            />
                            {index !== 0 && (
                              <Button
                                type="button"
                                className="rounded-xl"
                                variant="outline"
                                size="icon"
                                onClick={() => remove(index)}
                              >
                                <Trash size={16} />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="amenities" className="p-4">
            <FormItem>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  className="flex-wrap"
                  defaultValue={Object.keys(
                    form.watch('amenities.meta'),
                    // @ts-expect-error - Type 'string' cannot be used to index type '{ wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean; }'.
                  ).filter((key) => form.watch(`amenities.meta.${key}`))}
                >
                  {Object.entries(form.watch('amenities.meta')).map(
                    ([key, value]) => (
                      <ToggleGroupItem
                        key={key}
                        value={key}
                        onClick={() =>
                          // @ts-expect-error - Type 'string' cannot be used to index type '{ wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean; }'.
                          form.setValue(`amenities.meta.${key}`, !value)
                        }
                        className={`h-20 w-full border ${value ? 'selected' : ''}`}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </ToggleGroupItem>
                    ),
                  )}
                </ToggleGroup>
              </FormControl>
            </FormItem>
          </TabsContent>

          <TabsContent value="location" className="space-y-4 p-4">
            <FormField
              control={form.control}
              name="location.country"
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
              name="location.city"
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
              name="location.address"
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
              name="location.zip"
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
          </TabsContent>
        </Tabs>

        <div className="px-4">
          <Button type="submit" className="w-full">
            Save
            {loading && <LoaderCircle size={20} className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VenueEditForm;
