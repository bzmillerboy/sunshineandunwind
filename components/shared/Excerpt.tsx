import { P } from '@/components/shared/Typography'
import { blocksBodyToText } from '@/sanity/lib/utils'

const Excerpt = ({ blocks }) => {
  // console.log('Excerpt: ', blocks)
  const truncatedTextBlock = blocksBodyToText(blocks).substring(0, 180)
  return (
    <P className="text-base leading-5 lg:leading-5">
      {truncatedTextBlock}
      <span className="whitespace-nowrap">
        &hellip; <strong>Read More</strong>
      </span>
    </P>
  )
}

export default Excerpt
