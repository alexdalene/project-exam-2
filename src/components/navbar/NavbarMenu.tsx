import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavbarMenu = ({ links }: { links: { name: string; path: string }[] }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="border-none bg-transparent md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <ul className="flex flex-col items-start gap-4">
            {links.map((link) => {
              return (
                <li key={link.name}>
                  <Link to={link.path} className="">
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <hr className="border-muted-foreground" />
          <ul className="flex flex-col items-start gap-4">
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/auth" className="text-red-500">
                Log out
              </Link>
            </li>
          </ul>
          <hr className="border-muted-foreground" />
          <SheetFooter>© 2024 Holidaze. All rights reserved.</SheetFooter>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMenu;
