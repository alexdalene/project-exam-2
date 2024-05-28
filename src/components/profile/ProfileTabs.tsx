import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

import useStore from '@/store/venueStore';
import { ScrollArea } from '@/components/ui/scroll-area';

const ProfileTabs = () => {
  const { profile, profileLoading } = useStore();

  return (
    <div className="mt-16 w-full max-w-[468px] flex-1 lg:mt-0">
      <div>
        <Tabs defaultValue="venues">
          <TabsList>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>
          <TabsContent value="venues">
            {!profileLoading && (profile?.venues?.length ?? 0) > 0 ? (
              <ScrollArea className="h-fit max-h-[300px] w-full rounded-xl border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profile?.venues?.map((venue, index) => (
                      <TableRow key={index} role="button">
                        <TableCell className="font-medium">
                          VEN0{index}
                        </TableCell>
                        <TableCell className="max-w-[100px] truncate">
                          {venue.name}
                        </TableCell>
                        <TableCell>
                          {format(new Date(venue.created), 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          {venue.price},-
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            ) : (
              <div className="grid h-[100px] w-full place-content-center rounded-xl border">
                <p className="text-sm text-muted-foreground">
                  No venues found.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="bookings">
            {!profileLoading && (profile?.bookings?.length ?? 0) > 0 ? (
              <ScrollArea className="h-fit max-h-[300px] w-full rounded-xl border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profile?.bookings?.map((booking, index) => (
                      <TableRow key={index} role="button">
                        <TableCell className="font-medium">
                          BOK0{index}
                        </TableCell>
                        <TableCell>
                          {format(new Date(booking.dateFrom), 'LLL dd')} -{' '}
                          {format(new Date(booking.dateTo), 'LLL dd, y')}
                        </TableCell>
                        <TableCell className="text-right">
                          {booking.venue.price} NOK
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            ) : (
              <div className="grid h-[100px] w-full place-content-center rounded-xl border">
                <p className="text-sm text-muted-foreground">
                  No bookings found.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileTabs;
