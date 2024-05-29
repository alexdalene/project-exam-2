import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const StarRating = ({
  maxRating = 5,
  currentRating = 0,
  onRatingSelected,
}: {
  maxRating?: number;
  currentRating?: number;
  onRatingSelected: (rating: number) => void;
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Button
            variant="ghost"
            size="icon"
            type="button"
            key={ratingValue}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(currentRating)}
            onClick={() => onRatingSelected(ratingValue)}
            style={{ cursor: 'pointer' }}
          >
            {ratingValue <= (hover || currentRating) ? (
              <Star fill="#000" size={20} />
            ) : (
              <Star size={20} />
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default StarRating;
