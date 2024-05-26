import { useFilterState } from '@/hooks/useFilterState';
import { useVenueFilter } from '@/hooks/useVenueFilter';
import useStore from '@/store/venueStore';

import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';

const Panel = ({ component }: { component: string }) => {
  const { price, amenities, guests, page, setFilterState } = useFilterState();
  const { resetFiltersAndFetchVenues } = useVenueFilter();

  const { fetchAllVenues } = useStore();

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

  const handlePriceChange = (value: [number, number]) => {
    const newPrice = [...value] as [number, number];
    if (newPrice[0] > newPrice[1]) {
      newPrice[1] = newPrice[0];
    } else if (newPrice[1] < newPrice[0]) {
      newPrice[0] = newPrice[1];
    }
    setFilterState({ price: newPrice });
  };

  const handleSearch = () => {
    const filterCriteria = { price, amenities, guests };
    setFilterState(filterCriteria);
    fetchAllVenues(page, filterCriteria);
  };

  return (
    <>
      <form
        className="flex flex-col gap-8 px-4 pt-4 md:px-0"
        id="filter-form"
        role="filter"
      >
        <div className="flex flex-col gap-4">
          <Label htmlFor="price">Price</Label>
          <Slider
            step={100}
            min={100}
            max={5000}
            id="price"
            name="price"
            defaultValue={price}
            value={price}
            onValueChange={(value) => {
              handlePriceChange(value as [number, number]);
            }}
          />
          <div className="mt-8 flex items-center gap-4">
            <div className="relative w-full">
              <Label
                htmlFor="price-min"
                className="absolute top-0 -mt-4 text-xs text-muted-foreground"
              >
                From
              </Label>
              <Input
                type="number"
                id="price-min"
                value={price[0]}
                onChange={(value) =>
                  handlePriceChange([parseInt(value.target.value), price[1]])
                }
                min={100}
                max={5000}
                step={100}
                className="mt-2"
              />
            </div>
            -
            <div className="relative w-full">
              <Label
                htmlFor="price-max"
                className="absolute top-0 -mt-4 text-xs text-muted-foreground"
              >
                To
              </Label>
              <Input
                type="number"
                id="price-max"
                value={price[1]}
                onChange={(value) =>
                  handlePriceChange([price[0], parseInt(value.target.value)])
                }
                min={100}
                max={5000}
                step={100}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <Label htmlFor="amenities">Amenities</Label>
          <ToggleGroup
            type="multiple"
            id="amenitites"
            className="flex-nowrap justify-stretch gap-2"
            defaultValue={amenities}
            value={amenities}
            onValueChange={(value) =>
              setFilterState({ amenities: value as string[] })
            }
          >
            {theAmenities.map((amenity) => (
              <ToggleGroupItem
                key={amenity.name}
                value={amenity.name}
                variant="outline"
                aria-label={`Toggle ${amenity.label}`}
                className="h-20 w-full"
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
            min={1}
            max={12}
            value={guests}
            onChange={(value) =>
              setFilterState({
                guests: parseInt(value.target.value),
              })
            }
          />
        </div>

        {component === 'dialog' && (
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={resetFiltersAndFetchVenues}
            >
              Reset
            </Button>
            <DialogClose asChild>
              <Button type="button" onClick={handleSearch}>
                Search
              </Button>
            </DialogClose>
          </DialogFooter>
        )}

        {component === 'drawer' && (
          <DrawerFooter>
            <Button
              variant="outline"
              type="button"
              onClick={resetFiltersAndFetchVenues}
            >
              Reset
            </Button>
            <DrawerClose asChild>
              <Button type="button" onClick={handleSearch}>
                Search
              </Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </form>
    </>
  );
};

export default Panel;
