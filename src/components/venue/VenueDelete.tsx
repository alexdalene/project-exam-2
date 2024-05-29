import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import useStore from '@/store/venueStore';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const VenueDelete = ({ venueId }: { venueId: string }) => {
  const { deleteVenue, token, resetVenue } = useStore();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteVenue(token, venueId);
    navigate('/venues');
    resetVenue();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash size={16} />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[300px]">
        <DialogHeader>
          <DialogTitle>Delete venue</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this venue?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row-reverse gap-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="w-full"
          >
            Yes, delete it
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VenueDelete;
