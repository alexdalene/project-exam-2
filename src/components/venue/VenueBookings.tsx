import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye } from 'lucide-react';
import useStore from '@/store/venueStore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
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

const VenueBookings = () => {
  const { venue } = useStore();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="w-full"
            disabled={venue?.bookings?.length === 0}
          >
            <Eye size={20} />
            Bookings
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bookings</DialogTitle>
            <DialogDescription>
              Here you can see all the bookings for this venue.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-60 w-full rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Guests</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {venue?.bookings?.map((booking, index) => (
                  <TableRow key={index} role="button">
                    <TableCell className="font-medium">BOK0{index}</TableCell>
                    <TableCell>
                      {format(new Date(booking.dateFrom), 'LLL dd')} -{' '}
                      {format(new Date(booking.dateTo), 'LLL dd, y')}
                    </TableCell>
                    <TableCell className="text-right">
                      {booking.guests}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          className="w-full"
          disabled={venue?.bookings?.length === 0}
        >
          <Eye size={20} />
          Bookings
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4">
        <DrawerHeader>
          <DrawerTitle>Bookings</DrawerTitle>
          <DrawerDescription>
            Here you can see all the bookings for this venue.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-80 w-full rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Guests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {venue?.bookings?.map((booking, index) => (
                <TableRow key={index} role="button">
                  <TableCell className="font-medium">BOK0{index}</TableCell>
                  <TableCell>
                    {format(new Date(booking.dateFrom), 'LLL dd')} -{' '}
                    {format(new Date(booking.dateTo), 'LLL dd, y')}
                  </TableCell>
                  <TableCell className="text-right">{booking.guests}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <DrawerFooter className="px-0">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default VenueBookings;
