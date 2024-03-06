import "@/styles/globals.css"
import type { Metadata } from "next"
import { Toaster } from "react-hot-toast"
import { ConfigProvider } from "antd"
import { CustomAntTheme } from "@/styles/antd.theme"
import StyledComponentsRegistry from "@/providers/AntdRegistry"
import { ReduxProvider } from "@/providers/ReduxProvider"
import { ChatBackgroundProvider } from "@/providers/ChatBackgroundProvider"

// config css for fontawesome
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

import { SocketProvider } from "@/providers/SocketProvider"
import { RouteGuard } from "@/components/resource.guard"
import { setNonGuardRoutes } from "@/utils/helpers"
import { AuthProvider } from "@/providers/AuthProvider"
config.autoAddCss = false

export const metadata: Metadata = {
    title: "Thunder Chat",
    description: "Generated by Code VCN",
}

const non_guard_routes = setNonGuardRoutes("/faq", "/loginSignUp")

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="bg-white">
            <body>
                <StyledComponentsRegistry>
                    <ConfigProvider theme={CustomAntTheme}>
                        <ChatBackgroundProvider>
                            <ReduxProvider>
                                <AuthProvider>
                                    <RouteGuard nonGuardRoutes={non_guard_routes}>
                                        <SocketProvider>
                                            <div
                                                id="App-Wrapper"
                                                className="bg-regular-bg-darkGray-cl"
                                            >
                                                {children}
                                            </div>
                                        </SocketProvider>
                                    </RouteGuard>
                                </AuthProvider>
                            </ReduxProvider>
                        </ChatBackgroundProvider>
                    </ConfigProvider>
                </StyledComponentsRegistry>

                <Toaster
                    position="bottom-left"
                    reverseOrder={true}
                    toastOptions={{
                        duration: 3000,
                        error: {
                            style: {
                                backgroundColor: "rgb(255 132 132)",
                                color: "white",
                                fontWeight: "bold",
                            },
                        },
                        success: {
                            style: {
                                backgroundColor: "rgb(137 255 161)",
                                color: "white",
                                fontWeight: "bold",
                            },
                        },
                    }}
                />
            </body>
        </html>
    )
}
