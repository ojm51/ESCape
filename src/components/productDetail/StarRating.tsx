import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

interface StarRatingProps {
  rating: number
  maxStars?: number
  color?: string
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5, color = '#518CFC' }) => {
  const validRating = Number.isNaN(rating) || rating < 0 ? 0 : rating
  const validMaxStars = Number.isNaN(maxStars) || maxStars <= 0 ? 5 : maxStars

  const fullStars = Math.max(0, Math.floor(validRating))
  const halfStar = validRating - fullStars >= 0.5 ? 1 : 0
  const emptyStars = Math.max(0, validMaxStars - fullStars - halfStar)

  return (
    <div className="flex">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={`full-${index}`} style={{ color }} />
        ))}

      {halfStar === 1 && <FaStarHalfAlt key="half" style={{ color }} />}

      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={`empty-${index}`} style={{ color }} />
        ))}
    </div>
  )
}

export default StarRating
