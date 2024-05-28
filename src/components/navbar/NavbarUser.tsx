import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Plus, User, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '@/store/venueStore';
import { useNavigate } from 'react-router-dom';

const NavbarUser = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!user ? (
            <>
              <Link to="/auth">
                <DropdownMenuItem>
                  <LogIn size={16} />
                  <span>Login</span>
                </DropdownMenuItem>
              </Link>

              <Link to="/auth/signup">
                <DropdownMenuItem>
                  <UserPlus size={16} />
                  <span>Sign up</span>
                </DropdownMenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link to={`/profile/${user.name}`}>
                <DropdownMenuItem>
                  <User size={16} />
                  Profile
                </DropdownMenuItem>
              </Link>
            </>
          )}
        </DropdownMenuGroup>
        {user && (
          <>
            <DropdownMenuGroup>
              <Link to="/venues/create">
                <DropdownMenuItem>
                  <Plus size={16} />
                  Create
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                navigate('/auth');
              }}
              className="text-destructive"
            >
              <LogOut size={16} />
              Logout
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUser;
