import Img from '@/components/shared/Img'
import { H6 } from '@/components/shared/Typography'

interface StaffCardProps {
  image?: any
  firstName?: any
  lastName?: any
  role?: any
  phoneDirect?: any
  phoneCell?: any
  email?: any
}

export default function StaffCard({
  image,
  firstName,
  lastName,
  role,
  phoneDirect,
  phoneCell,
  email,
}: StaffCardProps) {
  const defaultImage = {
    asset: {
      _ref: 'image-9d741d567d2ecbf0e3729ce1b931ec2e2e4c72af-2060x2060-jpg',
    },
    _type: 'image',
  }

  return (
    <div className="group relative bg-black text-background overflow-hidden animate-fade">
      <Img
        image={image || defaultImage}
        alt={`${firstName} ${lastName} Profile Picture`}
        width={300}
        height={270}
        className="w-full"
      />

      <div className="absolute left-0 right-0 top-0 bottom-0 translate-y-full group-hover:translate-y-0 transition ease-in-out">
        <div className="absolute bottom-0 top-0 left-0 right-0 p-4 translate-y-[-73px] group-hover:translate-y-0 group-hover:top-auto transition ease-in-out bg-gradient-to-t from-zinc-950 from-20%">
          <div className="mb-2 invisible group-hover:visible">
            <svg
              width="37"
              height="22"
              fill="fffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.6 13.1c.2-.9 0-1.9-.3-2.7-.4-.8-.8-1.6-1.4-2.1a5.7 5.7 0 00-2.2-1.5c-.3-.1-.6-.2-.9 0-.6.4-1.1 1-1.5 1.6-1.2 4-2.2 8-2.8 12.1 1.9-.4 3.6-1 5.2-2.1 1.9-1.2 3.3-3 3.9-5.3zm-20-10.7c3 4 6.1 8 9.2 11.8 1-3.8 1.6-7.5 2.2-11.3a27 27 0 00-5.6-1c-2 0-4 0-5.9.5h.1zm-3 17.2c3.9 1.1 8 1.4 11.8.8-3-4.3-6.1-8.5-9.5-12.6-1 3.9-1.7 7.9-2.3 11.8zm-6-5c.7.6 1.4 1 2 1.3.5.2 1 0 1.2-.2.5-.5.8-1 1.1-1.6.9-2.5 1.5-5 2-7.5l.5-3 .2-1.4-2.8 1c-1.2.5-2.3 1.1-3.4 2a7.5 7.5 0 00-2.7 3.5c-.4 1-.3 2.3 0 3.4.5 1 1 1.8 1.8 2.5zm-3.8-.8a6 6 0 01.8-6.2 12 12 0 015-4.1 28.9 28.9 0 0123-.2c1.4.6 2.6 1.3 3.7 2.2 1.3 1 2.3 2.5 2.8 4.1.5 1.8.2 3.7-.8 5.2a13.8 13.8 0 01-7 5.1c-5.4 2-11.2 2.3-16.9 1-2.9-.5-5.6-1.8-7.9-3.7a10 10 0 01-2.7-3.4z"
                fill="#fff"
              />
            </svg>
          </div>
          <H6 className="text-background mb-2 group-hover:mb-0 leading-4 lg:leading-4">
            <span className="font-thin">{firstName}</span> {lastName}
          </H6>
          <p className="text-yellow-400">{role}</p>
          <p className="text-sm">
            {phoneDirect && (
              <>
                Direct: <a href={`tel:${phoneDirect}`}>{phoneDirect}</a>
              </>
            )}
          </p>
          <p className="text-sm">
            {phoneCell && (
              <>
                Cell: <a href={`tel:${phoneCell}`}>{phoneCell}</a>
              </>
            )}
          </p>
          <p className="text-sm">
            Email: <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
      </div>
    </div>
  )
}
