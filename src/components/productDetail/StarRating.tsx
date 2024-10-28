import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

interface StarRatingProps {
  rating: number
  maxStars?: number
  color?: string
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5, color = '#518CFC' }) => {
  if (isNaN(rating) || rating < 0) {
    console.error('Invalid rating value:', rating)
    rating = 0
  }

  if (isNaN(maxStars) || maxStars <= 0) {
    console.error('Invalid maxStars value:', maxStars)
    maxStars = 5
  }

  const fullStars = Math.max(0, Math.floor(rating))
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0
  const emptyStars = Math.max(0, maxStars - fullStars - halfStar)

  return (
    <div className="flex">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={index} style={{ color }} />
        ))}

      {halfStar === 1 && <FaStarHalfAlt style={{ color }} />}

      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={index} style={{ color }} />
        ))}
    </div>
  )
}

export default StarRating
