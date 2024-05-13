import { useVenueStore } from '@/store/venues';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';

import VenueGrid from '@/components/venue/VenueGrid';
import { Venue } from '@/types/venue';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';

const FilterPanel = () => {
  return (
    <>
      <div className="mb-8 px-4 pt-16">
        <h1 className="mb-2 uppercase">Venues</h1>
        <p className="text-sm text-muted-foreground">
          Browse venues from around the world.
        </p>
      </div>

      <div className="flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-4">
          <Label htmlFor="search">Search</Label>
          <Input placeholder="Search for venues..." id="search" />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="price">Price</Label>
          <Slider step={1} defaultValue={[50]} max={200} id="price" />
          <span className="text-center text-muted-foreground">£50 - £200</span>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="amenities">Amenities</Label>
          <ToggleGroup type="multiple" id="amenitites">
            <ToggleGroupItem value="a" variant="outline">
              WiFi
            </ToggleGroupItem>
            <ToggleGroupItem value="b" variant="outline">
              Breakfast
            </ToggleGroupItem>
            <ToggleGroupItem value="c" variant="outline">
              Pets
            </ToggleGroupItem>
            <ToggleGroupItem value="d" variant="outline">
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
            min={0}
          />
        </div>
      </div>
    </>
  );
};

const VenuePanel = ({ venues }: { venues: Venue[] }) => {
  return (
    <>
      <ScrollArea className="h-dvh">
        <div className="grid grid-cols-1 pt-14 md:grid-cols-3">
          {venues.map((venue) => (
            <VenueGrid key={venue.id} {...venue} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

const Venues = () => {
  const fetchVenues = useVenueStore((state) => state.fetchVenues);
  const venues = useVenueStore((state) => state.venues);
  const sidebarRef = useRef(null);
  const venueRef = useRef(null);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  useEffect(() => {
    if (isMobile) {
      sidebarRef.current?.collapse();
    } else {
      sidebarRef.current?.expand();
    }
  }, [isMobile]);

  const handleFilterClick = useCallback(() => {
    if (sidebarRef.current?.isCollapsed()) {
      sidebarRef.current?.expand();
      sidebarRef.current?.resize(100);
      setIsCollapsed(false);
    } else {
      sidebarRef.current?.collapse();
      setIsCollapsed(true);
    }
  }, []);

  return (
    <>
      {isMobile && (
        <Button
          className="fixed right-2 top-16 z-10"
          onClick={() => handleFilterClick()}
        >
          <ListFilter size={20} />
          Filter
        </Button>
      )}

      <ResizablePanelGroup direction={'horizontal'}>
        <ResizablePanel
          minSize={25}
          defaultSize={30}
          collapsible
          id="sidebar"
          order={1}
          ref={sidebarRef}
        >
          <FilterPanel />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel
          id="main"
          order={2}
          minSize={50}
          defaultSize={70}
          collapsible
          ref={venueRef}
        >
          <VenuePanel venues={venues} />

          {isCollapsed && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious to="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink to="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext to="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Venues;
