import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit2Icon } from 'lucide-react';
import ProfileForm from './ProfileForm';

const ProfileUpdate = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-xl">
          <Edit2Icon size={20} />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Edit your profile settings and information.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdate;
