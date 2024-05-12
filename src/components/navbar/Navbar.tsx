import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import NavbarMenu from '@/components/navbar/NavbarMenu';
import NavbarUser from '@/components/navbar/NavbarUser';

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
      <div className="mx-auto mt-3 flex w-full max-w-[1100px] flex-1 list-none items-center justify-between rounded-2xl border border-black/5 bg-gradient-to-tr from-stone-100/5 to-stone-200/20 px-4 py-3 backdrop-blur-xl md:justify-center">
        <Link
          to="/"
          className="absolute left-0 hidden pl-8 text-sm font-semibold uppercase md:inline"
        >
          Holidaze
        </Link>

        <NavbarMenu links={links} />

        <NavigationMenuList className="hidden space-x-1 md:flex">
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
        </NavigationMenuList>

        <NavbarUser />
      </div>
    </NavigationMenu>
  );
};

export default Navbar;
