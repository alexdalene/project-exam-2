import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavbarMenu = ({ links }: { links: { name: string; path: string }[] }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Menu size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>HOLIDAZE</SheetTitle>
          <SheetDescription>
            Venues from around the world, all in one place.
          </SheetDescription>
        </SheetHeader>
        <ul className="mt-8">
          {links.map((link) => {
            const isActive = window.location.pathname === link.path;

            return (
              <li key={link.path}>
                <SheetClose asChild>
                  <Link
                    to={link.path}
                    className={`
                  block
                  rounded-xl
                  px-4
                 py-3
                  ${isActive ? 'bg-accent' : ''}
                  ${!isActive ? 'bg-transparent' : ''}
                
                `}
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMenu;
