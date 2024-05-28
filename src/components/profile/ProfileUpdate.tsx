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
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const ProfileUpdate = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
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
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-xl">
          <Edit2Icon size={20} />
          <span className="sr-only">Settings</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Edit your profile settings and information.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <ProfileForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileUpdate;
