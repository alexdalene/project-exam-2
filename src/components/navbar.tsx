import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';

import { Link } from 'react-router-dom';

import { Menu, LogIn, HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="primary"
                className="btn-hover-slide-right-outline group gap-2 border-foreground text-sm text-foreground before:bg-foreground"
              >
                <span className="z-10 flex items-center gap-2 group-hover:text-background">
                  Menu
                  <Menu />
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between">
              <NavigationMenuList className="flex-col items-start gap-4 text-lg font-semibold">
                <NavigationMenuItem>
                  <Link to="/">Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/">Browse</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/">Account</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/">About</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
              <div className="flex gap-2">
                <Button variant="primary">
                  <LogIn />
                  Login
                </Button>
                <Button variant="primary">
                  <HomeIcon />
                  Create
                </Button>
              </div>
              <SheetFooter>© 2024 Holidaze</SheetFooter>
            </SheetContent>
          </Sheet>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
