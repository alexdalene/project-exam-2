import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';

import { Form, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Panel = ({ component }: { component: string }) => {
  const [price, setPrice] = useState([500]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [guests, setGuests] = useState(1);

  const { filters } = useLoaderData() as {
    filters: { price: string; amenities: string; guests: string };
  };

  useEffect(() => {
    if (filters) {
      if (filters.price) {
        setPrice([parseInt(filters.price)]);
      }

      if (filters.amenities) {
        setAmenities(filters.amenities.split(','));
      }

      if (filters.guests) {
        setGuests(parseInt(filters.guests));
      }
    }
  }, [filters]);

  const theAmenities = [
    {
      name: 'wifi',
      label: 'WiFi',
    },
    {
      name: 'breakfast',
      label: 'Breakfast',
    },
    {
      name: 'pets',
      label: 'Pets',
    },
    {
      name: 'parking',
      label: 'Parking',
    },
  ];

  return (
    <>
      <Form
        className="flex flex-col gap-8 px-4 pt-4 md:px-0"
        id="filter-form"
        role="filter"
        method="get"
      >
        <div className="flex flex-col gap-4">
          <Label htmlFor="price">Price</Label>
          <Slider
            step={100}
            max={5000}
            id="price"
            name="price"
            value={price}
            onValueChange={(value) => setPrice(value)}
          />
          <span className="text-center text-muted-foreground">
            {price} NOK per night
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="amenities">Amenities</Label>
          <ToggleGroup
            type="multiple"
            id="amenitites"
            value={amenities}
            defaultValue={amenities}
            onValueChange={(value) => {
              setAmenities(value);
            }}
          >
            {theAmenities.map((amenity) => (
              <ToggleGroupItem
                key={amenity.name}
                value={amenity.name}
                variant="outline"
                aria-label={`Toggle ${amenity.label}`}
              >
                {amenity.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <input type="hidden" name="amenities" value={amenities} />

        <div className="flex flex-col gap-4">
          <Label htmlFor="guests">Guests</Label>
          <Input
            type="number"
            placeholder="How many guests?"
            className="text-base"
            id="guests"
            name="guests"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            min={1}
          />
        </div>

        {component === 'dialog' && (
          <DialogFooter>
            <Button variant="outline">Reset</Button>
            <DialogClose asChild>
              <Button type="submit">Search</Button>
            </DialogClose>
          </DialogFooter>
        )}

        {component === 'drawer' && (
          <DrawerFooter>
            <Button variant="outline">Reset</Button>
            <DrawerClose asChild>
              <Button type="submit">Search</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="ghost" className="mt-4">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </Form>
    </>
  );
};

export default Panel;
