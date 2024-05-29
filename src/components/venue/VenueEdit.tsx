import { Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerFooter,
} from '@/components/ui/drawer';
import VenueEditForm from './VenueEditForm';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const VenueEdit = ({ venueId }: { venueId: string }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Edit2 size={16} />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit your venue</DialogTitle>
            <DialogDescription>
              Make changes to your venue and click save to update.
            </DialogDescription>
          </DialogHeader>
          <VenueEditForm venueId={venueId} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary">
          <Edit2 size={16} />
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit your venue</DrawerTitle>
          <DrawerDescription>
            Make changes to your venue and click save to update.
          </DrawerDescription>
        </DrawerHeader>
        <VenueEditForm venueId={venueId} />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default VenueEdit;
