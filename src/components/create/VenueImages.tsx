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
import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import { Plus, Trash } from 'lucide-react';
import useStore from '@/store/venueStore';
import { Separator } from '../ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export const VenueImagesSchema = z.object({
  media: z.array(
    z.object({
      url: z.string().url({ message: 'Invalid URL' }),
      alt: z
        .string()
        .max(120, {
          message: 'Description must be at most 120 characters long',
        })
        .optional(),
    }),
  ),
});

const VenueImages = () => {
  const { setStoredForm, setFormPhase, storedForm, setFormIsDone } = useStore();
  const form = useForm<z.infer<typeof VenueImagesSchema>>({
    resolver: zodResolver(VenueImagesSchema),
    defaultValues: {
      media: storedForm.media || [{ url: '', alt: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'media',
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ url: '', alt: '' });
    }
  }, [append, fields.length]);

  const onSubmit = (values: z.infer<typeof VenueImagesSchema>) => {
    setStoredForm({ ...storedForm, media: values.media });
    setFormPhase('amenities');
    setFormIsDone('images');
  };

  const canAddMore = fields.length < 4;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-4 md:px-0"
      >
        <h1 className="mx-auto mb-8 max-w-[16ch] text-center text-lg">
          Let’s showcase your beautiful venue
        </h1>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Images</p>
          <Button
            type="button"
            size="sm"
            onClick={() => append({ url: '', alt: '' })}
            variant="outline"
            className="rounded-xl"
            disabled={!canAddMore}
          >
            Add more images <Plus size={16} />
          </Button>
        </div>

        <Separator />

        <ScrollArea className="h-72 w-full rounded-xl border">
          <div className="space-y-4 p-4">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`media.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Image {index + 1}</FormLabel>
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

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setFormPhase('info')}
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

export default VenueImages;
