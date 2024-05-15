import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';

import { useSearchParams } from 'react-router-dom';

const DEFAULT_PRICE = [500];

const Panel = ({ component }: { component: string }) => {
  const [searchParams] = useSearchParams();

  const price = searchParams.get('price')
    ? [Number(searchParams.get('price'))]
    : DEFAULT_PRICE;
  const amenities = searchParams.get('amenities') || '';
  const guests = searchParams.get('guests') || '';

  console.log(price, amenities, guests);

  return (
    <>
      <div className="flex flex-col gap-8 px-4 pt-4 md:px-0">
        <div className="flex flex-col gap-4">
          <Label htmlFor="price">Price</Label>
          <Slider
            step={100}
            defaultValue={DEFAULT_PRICE}
            max={5000}
            id="price"
            value={price}
          />
          <span className="text-center text-muted-foreground">
            {price} NOK per night
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="amenities">Amenities</Label>
          <ToggleGroup type="multiple" id="amenitites">
            <ToggleGroupItem
              value="wifi"
              variant="outline"
              data-state={amenities.includes('wifi') ? 'on' : 'off'}
            >
              WiFi
            </ToggleGroupItem>
            <ToggleGroupItem
              value="breakfast"
              variant="outline"
              data-state={amenities.includes('breakfast') ? 'on' : 'off'}
            >
              Breakfast
            </ToggleGroupItem>
            <ToggleGroupItem
              value="pets"
              variant="outline"
              data-state={amenities.includes('pets') ? 'on' : 'off'}
            >
              Pets
            </ToggleGroupItem>
            <ToggleGroupItem
              value="parking"
              variant="outline"
              data-state={amenities.includes('parking') ? 'on' : 'off'}
            >
              Parking
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="guests">Guests</Label>
          <Input
            type="number"
            placeholder="How many guests?"
            className="text-base"
            id="guests"
            value={guests}
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
      </div>
    </>
  );
};

export default Panel;
