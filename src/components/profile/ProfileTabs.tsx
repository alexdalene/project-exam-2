import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ProfileTabs = () => {
  return (
    <div className="mt-16 max-w-[468px] lg:mt-0">
      <h2 className="text-sm font-medium text-muted-foreground">Manage</h2>
      <div className="mt-4">
        <Tabs defaultValue="venues" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>
          <TabsContent value="venues">
            <Table>
              <TableCaption>A list of your venues.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="bookings">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileTabs;
