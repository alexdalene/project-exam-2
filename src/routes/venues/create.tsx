import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VenueInfo from '@/components/create/VenueInfo';
import VenueImages from '@/components/create/VenueImages';
import VenueAmenities from '@/components/create/VenueAmenities';
import VenueLocation from '@/components/create/VenueLocation';
import useStore from '@/store/venueStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Helmet } from 'react-helmet';

const VenuesCreate = () => {
  const { formPhase, resetStoredForm, token, formIsDone } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/auth');
    }
    return () => {
      resetStoredForm();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Holidaze | Create Venue</title>
        <meta
          name="description"
          content="
        Create a venue listing on Holidaze. Add images, amenities, and location 
        details to your venue listing. Start hosting guests today."
        />
      </Helmet>

      <div className="mt-14 flex min-h-[calc(100svh-56px)] justify-center pt-14">
        <Tabs
          defaultValue="info"
          className="flex w-[400px] flex-col gap-4"
          activationMode="automatic"
          value={formPhase}
        >
          <TabsList className="mx-auto h-12 w-full max-w-max justify-center bg-transparent">
            <TabsTrigger
              className="h-10 w-10 border data-[is-done=true]:bg-foreground data-[state=active]:bg-foreground data-[is-done=true]:text-background data-[state=active]:text-background"
              value="info"
              data-is-done={formIsDone.info}
            >
              {formIsDone.info ? '✓' : '1'}
            </TabsTrigger>
            <Separator dir="vertical" className="w-[50px]" />
            <TabsTrigger
              className="h-10 w-10 border data-[is-done=true]:bg-foreground data-[state=active]:bg-foreground data-[is-done=true]:text-background data-[state=active]:text-background"
              value="images"
              data-is-done={formIsDone.images}
            >
              {formIsDone.images ? '✓' : '2'}
            </TabsTrigger>
            <Separator dir="vertical" className="w-[50px]" />
            <TabsTrigger
              className="h-10 w-10 border data-[is-done=true]:bg-foreground data-[state=active]:bg-foreground data-[is-done=true]:text-background data-[state=active]:text-background"
              value="amenities"
              data-is-done={formIsDone.amenities}
            >
              {formIsDone.amenities ? '✓' : '3'}
            </TabsTrigger>
            <Separator dir="vertical" className="w-[50px]" />
            <TabsTrigger
              className="h-10 w-10 border data-[is-done=true]:bg-foreground data-[state=active]:bg-foreground data-[is-done=true]:text-background data-[state=active]:text-background"
              value="location"
              data-is-done={formIsDone.location}
            >
              {formIsDone.location ? '✓' : '4'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <VenueInfo />
          </TabsContent>
          <TabsContent value="images">
            <VenueImages />
          </TabsContent>
          <TabsContent value="amenities">
            <VenueAmenities />
          </TabsContent>
          <TabsContent value="location">
            <VenueLocation />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default VenuesCreate;
