import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
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
            A new and innovative to explore and create venues.
          </SheetDescription>
        </SheetHeader>
        <ul className="mt-8">
          {links.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="block py-3">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMenu;
