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
  SheetHeader,
} from '@/components/ui/sheet';

import { Link } from 'react-router-dom';
import { Menu, LogIn, HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const Navbar = () => {
  const sectionRef = useRef(null!);

  useGSAP(
    () => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        delay: 0.2,
        y: -100,
        duration: 1,
        ease: 'power2.inOut',
      });
    },
    { scope: sectionRef },
  );

  return (
    <NavigationMenu ref={sectionRef}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="primary"
                className="gap-2 border-foreground bg-background text-sm text-foreground before:bg-foreground"
              >
                <span className="z-10 flex items-center gap-2">
                  Menu
                  <Menu />
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between">
              <SheetHeader>
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
              </SheetHeader>
              <SheetFooter>© 2024 Holidaze</SheetFooter>
            </SheetContent>
          </Sheet>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
