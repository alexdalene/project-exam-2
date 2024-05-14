import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Panel from '@/components/filter/Panel';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ListFilter } from 'lucide-react';

const FilterPanel = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-12 min-w-12" size="icon">
            <ListFilter />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter your search</DialogTitle>
            <DialogDescription>
              Adjust the filters to your liking, then click search.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <Panel />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="h-12 min-w-12" size="icon">
          <ListFilter />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Filter your search</DrawerTitle>
          <DrawerDescription>
            Adjust the filters to your liking, then click search.
          </DrawerDescription>
        </DrawerHeader>
        <Separator />
        <Panel />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterPanel;
