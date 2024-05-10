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
      <NavigationMenuList>
        <Link
          to="/"
          className="absolute left-0 hidden pl-8 text-sm font-semibold uppercase md:inline"
        >
          Holidaze
        </Link>

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

        <NavbarMenu links={links} />

        <NavbarUser />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
