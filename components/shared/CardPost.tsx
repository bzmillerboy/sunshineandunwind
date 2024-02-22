import Excerpt from '@/components/shared/Excerpt'
import Img from '@/components/shared/Img'
import { H5, H6 } from '@/components/shared/Typography'
import { MainImage } from '@/types'

export interface CardPostProps {
  image?: MainImage
  title: string
  excerpt?: any
  compact?: boolean
}

export default function CardPost({
  image,
  title,
  excerpt,
  compact,
}: CardPostProps) {
  // console.log('CardPost', title, compact)
  return (
    <div className="overflow-hidden">
      <Img
        image={image}
        alt={title}
        width={672}
        height={332}
        className="mb-3 overflow-hidden rounded-[3px] w-full "
        //scale-100 hover:scale-102 hover:transition-transform duration-300 ease-in-out
        mode="cover"
      />

      {compact ? (
        <H6 className="leading-6 lg:leading-6">{title}</H6>
      ) : (
        <H5 className="leading-6 lg:leading-6">{title}</H5>
      )}

      {excerpt && <Excerpt blocks={excerpt} />}
    </div>
  )
}
