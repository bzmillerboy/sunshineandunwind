import Logo from '@/components/shared/Logo'
import MainMenu from './MainMenu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export async function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 text-white h-auto dark">
      <div className="px-12 py-4 mx-auto border-b border-white/25">
        <div
          style={{
            backgroundImage:
              'linear-gradient(180deg, #000000 0%, #00000000 100%',
          }}
          className="absolute  z-10 top-0 left-0 right-0 bottom-0 opacity-40"
        ></div>
        <div className="flex relative z-20">
          <div className="w-[0%] md:w-[40%]">
            <div className="items-center h-full space-x-4 hidden lg:flex">
              <div className="hidden">
                <MainMenu />
              </div>
            </div>
          </div>
          <div className="w-[100%] md:w-[20%]">
            <div className="max-w-52 lg:max-w-60 mx-auto">
              <Logo />
            </div>
          </div>
          <div className="w-[0%] md:w-[40%]">
            <div className="justify-end items-center h-full space-x-4 hidden lg:flex">
              <a href="tel:8593635411" className="p-4 hidden lg:flex">
                Tel: 859.363.5411
              </a>
              <Link href="mailto:info@sunshineandunwind.com" target="_blank">
                <Button variant="outline" className="m-0">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
