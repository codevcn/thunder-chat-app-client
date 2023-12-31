import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { ConfigProvider } from 'antd'
import { CustomAntTheme } from '@/styles/theme'
import StyledComponentsRegistry from '@/lib/AntdRegistry'
import { ReduxProvider } from '@/lib/ReduxProvider'
import { BackgroundProvider } from '@/lib/BackgroundProvider'

// config css for fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const workSans = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Thunder Chat',
    description: 'Generated by Code VCN',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className='bg-white'>

            <body className={workSans.className}>

                <StyledComponentsRegistry>
                    <ConfigProvider
                        theme={CustomAntTheme}
                    >
                        <ReduxProvider>
                            <BackgroundProvider>
                                <div
                                    id="App"
                                    className='bg-regular-DarkGray'
                                >
                                    {children}
                                </div>
                            </BackgroundProvider>
                        </ReduxProvider>
                    </ConfigProvider>
                </StyledComponentsRegistry>

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    gutter={8}
                    toastOptions={{
                        duration: 2000,
                    }}
                />

            </body>

        </html>
    )
}
