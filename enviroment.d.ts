declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production"
            NEXT_PUBLIC_SERVER_ENDPOINT: string
            NEXT_PUBLIC_SERVER_HOST: string
        }
    }
}

export {}
