import { CustomPortableText } from '@/components/shared/CustomPortableText'
import Img from '@/components/shared/Img'
import { H3 } from '@/components/shared/Typography'

interface EquipmentHighlightProps {
  color?: string
  logo?: { asset?: any; alt?: string }
  body?: any
  tagline?: string
}

export default function EquipmentHighlight({
  color,
  logo,
  body,
  tagline,
}: EquipmentHighlightProps) {
  return (
    <section className="container grid grid-cols-1 md:grid-cols-3 mb-12">
      <div className="flex item-center align-middle text-center">
        <H3 className="text-gray-400 m-auto">{tagline}</H3>
      </div>
      <div className="p-8 bg-gray-100 text-right">
        <CustomPortableText value={body || []} />
      </div>
      <div className="flex items-center" style={{ backgroundColor: color }}>
        <div className="m-auto">
          <Img image={logo} alt={logo?.alt} width={700} />
        </div>
      </div>
    </section>
  )
}
