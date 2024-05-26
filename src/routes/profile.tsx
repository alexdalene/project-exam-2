import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useStore from '@/store/venueStore';

const Profile = () => {
  const { name } = useParams();
  const { fetchProfile, token } = useStore();

  useEffect(() => {
    fetchProfile(token, name);
  }, [fetchProfile]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Profile;
