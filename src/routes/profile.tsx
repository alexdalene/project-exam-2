import useStore from '@/store/venueStore';

import ProfileUpdate from '@/components/profile/ProfileUpdate';
import ProfileTabs from '@/components/profile/ProfileTabs';

import { Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const Profile = () => {
  const { name } = useParams();
  const { fetchProfile, token, profile, user } = useStore();
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    fetchProfile(token, name);
  }, [fetchProfile, name]);

  useEffect(() => {
    if (name === user?.name) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [name]);

  return (
    <>
      <Helmet>
        <title>Holidaze | {profile?.name}</title>
        <meta
          name="description"
          content={profile?.bio ? profile?.bio : 'No bio available.'}
        />
      </Helmet>

      <div className="mx-auto mt-14 min-h-[calc(100svh-56px)] max-w-[1400px]">
        <div className="flex flex-col px-4 md:px-8 lg:flex-row lg:gap-16 lg:px-16 lg:pt-16">
          <div className="flex w-full max-w-[768px] flex-1 flex-col gap-8 pt-16 lg:pt-0">
            <div className="flex gap-2">
              <div className="h-10 w-10 overflow-hidden rounded-xl">
                <img
                  src={profile?.avatar.url}
                  alt={profile?.avatar.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              {isUser && <ProfileUpdate />}
            </div>

            <div>
              <div className="space-y-1">
                <h1 className="font-medium">{profile?.name}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{profile?._count.venues} venues</span>
                  <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
                  <span>{profile?._count.bookings} bookings</span>
                </div>
              </div>
            </div>

            <div className="h-40 w-full overflow-hidden rounded-[2rem]">
              <img
                src={profile?.banner.url}
                alt={profile?.banner.alt}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="max-w-[60ch] space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground">Bio</h2>
              <p className="text-pretty leading-6">
                {profile?.bio
                  ? profile.bio
                  : 'Do duis aliqua nulla voluptate quis pariatur officia adipisicing ullamco pariatur nulla mollit dolor aute. Laboris cillum qui eu esse. Lorem magna enim id. Non nisi commodo dolor magna eu et officia ad cillum consequat laboris magna pariatur. Nisi exercitation nostrud laboris labore non proident est minim voluptate elit aliqua.'}
              </p>
            </div>
          </div>

          {isUser && <ProfileTabs />}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Profile;
