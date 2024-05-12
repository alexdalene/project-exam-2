import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import NavbarMenu from '@/components/navbar/NavbarMenu';
import NavbarUser from '@/components/navbar/NavbarUser';

import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const links: { name: string; path: string }[] = [
    { name: 'Home', path: '/' },
    { name: 'Venues', path: '/venues' },
    { name: 'Account', path: '/account' },
    { name: 'Contact', path: '/contact' },
  ];

  const location = useLocation();

  return (
    <NavigationMenu>
      <NavbarMenu links={links} />

      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className="font-semibold uppercase">
            Holidaze
          </Link>
        </NavigationMenuItem>

        {links.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <NavigationMenuItem key={link.name} className="h-full">
              <NavigationMenuLink asChild active={isActive}>
                <Link to={link.path} className={navigationMenuTriggerStyle()}>
                  {link.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>

      <NavbarUser />
    </NavigationMenu>
  );
};

export default Navbar;
