interface VenueProps {
  media: {
    url: string;
    alt: string;
  }[];
}

const Venue = (venue: VenueProps) => {
  return (
    <div className="w-full overflow-hidden">
      <img
        src={venue.media[0]?.url}
        alt={venue.media[0]?.alt}
        className="h-full w-full"
      />
    </div>
  );
};

export default Venue;
