import Image from 'next/image'
import AppLogo from '@/assets/images/logo.svg'
import Link from 'next/link'

interface Nav {
    label: string
    href: string
}

const navs: Nav[] = [
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
]

const Navigation = () => {
    return (
        <div className='Navigation flex w-full p-14 pt-7 pb-7 justify-between items-center bg-clip-content'>
            <a
                className='flex items-center no-underline text-black'
                href='/'
            >
                <Image src={AppLogo} alt='AppLogo' className='w-16 h-16 translate-x-2' />
                <h2 className='text-lg font-bold'>
                    Thunder Chat.
                </h2>
            </a>

            <div className='Navigation/Navs flex gap-x-12 text-lg h-fit font-nunito mr-5'>
                {
                    navs.map(({ href, label }) => (
                        <Link
                            key={label}
                            className='group cursor-pointer relative'
                            href={href}
                        >
                            <span>{label}</span>
                            <span className='block absolute -bottom-3 h-1 bg-black w-full scale-x-0 transition group-hover:scale-x-100'></span>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

const IntroText = () => {
    const LogoStyle: React.CSSProperties = {
        transform: 'rotateY(180deg)',
        width: '1.1em',
    }

    return (
        <div className='IntroText mt-10 flex flex-col items-center'>
            <h1 className='text-7xl font-bold flex'>
                <span>THUND</span>
                <span className='inline-block relative h-[1em] w-14'>
                    <span className='inline-block animate-bounce w-14 absolute z-10 top-3'>
                        <Image
                            src={AppLogo}
                            alt='AppLogo'
                            style={LogoStyle}
                        />
                    </span>
                </span>
                <span>R CHAT</span>
            </h1>

            <div className='mt-10'>
                Faster and more convinient for sending message with
                <span className='font-bold'> Thunder Chat</span>
            </div>
        </div>
    )
}

const AuthBtn = () => {
    return (
        <div className='AuthBtn mt-14 w-5/12 flex flex-col items-center'>
            <Link
                href='/loginSignUp'
                className='rounded-full transition border-2 w-5/6 p-5 pt-3 pb-3 bg-black text-white block text-center hover:bg-white hover:text-black'
            >
                Login / Register
            </Link>

            <Link
                href='/loginGuest'
                className='rounded-full transition border-2 w-5/6 p-5 pt-3 pb-3 mt-5 bg-black text-white block text-center hover:bg-white hover:text-black'
            >
                Login as guest
            </Link>
        </div>
    )
}

export default function HomePage() {
    return (
        <div className='HomePage bg-white text-black flex flex-col items-center'>

            <Navigation />

            <IntroText />

            <AuthBtn />

        </div>
    )
}
