import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const DEFAULT_PRICE = [500];

const Panel = () => {
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [guests, setGuests] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const priceParam = searchParams.get('price');
    const amenitiesParam = searchParams.get('amenities');
    const guestsParam = searchParams.get('guests');

    if (priceParam) {
      setPrice(priceParam.split(',').map((price) => Number(price)));
    }

    if (amenitiesParam) {
      setAmenities(
        decodeURIComponent(amenitiesParam).split(',').filter(Boolean),
      );
    }

    if (guestsParam) {
      setGuests(guestsParam);
    }
  }, [location.search]);

  const handleFilter = () => {
    const params = new URLSearchParams();

    if (price) {
      params.set('price', price.join(','));
    }

    if (amenities.length) {
      params.set('amenities', amenities.join(','));
    }

    if (guests) {
      params.set('guests', guests);
    }

    setSearchParams(params);
  };

  const handleReset = () => {
    setPrice(DEFAULT_PRICE);
    setAmenities([]);
    setGuests('');
    setSearchParams('');
  };

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
            onValueChange={(value) => {
              if (value) setAmenities(value);
            }}
          >
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
            id="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min={1}
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
        <DialogClose asChild>
          <Button onClick={handleFilter}>Search</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

export default Panel;
