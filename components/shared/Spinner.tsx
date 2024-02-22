import { CgSpinner } from 'react-icons/cg'

export default function Spinner({ className }) {
  return (
    <div role="status">
      <CgSpinner className={`animate-spin ${className}`} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
