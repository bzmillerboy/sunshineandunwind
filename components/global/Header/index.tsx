import Logo from '@/components/shared/Logo'
import MainMenu from './MainMenu'
import { Button } from '@/components/ui/button'

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
          <div className="w-[40%]">
            <div className="flex items-center h-full space-x-4">
              <MainMenu />
            </div>
          </div>
          <div className="w-[20%]">
            <Logo />
          </div>
          <div className="w-[40%]">
            <div className="flex justify-end items-center h-full space-x-4">
              <a href="tel:8593635411" className="p-4">
                Tel: 859.363.5411
              </a>
              <Button variant="outline" className="m-0">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
