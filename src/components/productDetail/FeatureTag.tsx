import StarRating from './StarRating'

interface FeatureTagProps {
  label: string
  value: number | string
  isStarRating?: boolean
}

const FeatureTag: React.FC<FeatureTagProps> = ({ label, value, isStarRating = false }) => {
  return (
    <div className="flex items-center space-x-2 rounded-full bg-blue-900 px-3 py-1 text-white">
      <span>{label}</span>
      {isStarRating ? <StarRating rating={value as number} /> : <span>{value}</span>}
    </div>
  )
}

export default FeatureTag
