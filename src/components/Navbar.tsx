import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';
import { ChevronDownIcon, MenuIcon, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Venues', path: '/venues' },
    { name: 'Account', path: '/account' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <span className="absolute left-0 hidden pl-8 text-sm font-semibold uppercase md:inline">
          Holidaze
        </span>
        <div className="hidden space-x-1 md:flex">
          {links.map((link) => {
            return (
              <NavigationMenuItem key={link.name}>
                <NavigationMenuLink asChild>
                  <Link to={link.path} className={navigationMenuTriggerStyle()}>
                    {link.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="border-none bg-transparent md:hidden"
            >
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
              <hr className="border-black/5" />
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
              <hr className="border-black/5" />
              <SheetFooter>© 2024 Holidaze. All rights reserved.</SheetFooter>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="right-0 flex md:absolute md:pr-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-2 px-0 hover:bg-transparent"
              >
                <ChevronDownIcon size={20} />
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <User size={16} />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
