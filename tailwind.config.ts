import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/flowbite-react/**/*.js",
        "./src/materials/*.{js,ts,tsx,mdx}",
    ],
    theme: {
        fontFamily: {
            sans: ["ui-sans-serif", "system-ui"],
            serif: ["ui-serif", "Georgia"],
            mono: ["ui-monospace", "SFMono-Regular"],
            roboto: ["var(--ggfont-roboto)"],
        },
        extend: {
            screens: {
                "screen-medium-chatting": "970px",
                "screen-large-chatting": "1275px",
            },
            backgroundImage: {
                "user-avt-bgimg": "var(--tdc-user-avt-bgimg)",
                "modal-text-bgimg": "var(--tdc-modal-text-bgimg)",
            },
            backgroundSize: {
                "regular-full-bgsize": "var(--tdc-full-bgsize)",
            },
            colors: {
                "regular-darkGray-cl": "var(--tdc-regular-darkGray-cl)",
                "regular-white-cl": "var(--tdc-regular-white-cl)",
                "regular-trans-cl": "var(--tdc-regular-trans-cl)",
                "regular-black-cl": "var(--tdc-regular-black-cl)",
                "regular-violet-cl": "var(--tdc-regular-violet-cl)",
                "regular-hover-card-cl": "var(--tdc-regular-hover-card-cl)",
                "regular-icon-cl": "var(--tdc-regular-icon-cl)",
                "regular-icon-btn-cl": "var(--tdc-regular-icon-btn-cl)",
                "regular-placeholder-text-cl": "var(--tdc-regular-placeholder-text-cl)",
                "regular-recipient-msg-time-cl": "var(--tdc-regular-recipient-msg-time-cl)",
                "regular-creator-msg-time-cl": "var(--tdc-regular-creator-msg-time-cl)",
                "regular-text-secondary-cl": "var(--tdc-regular-text-secondary-cl)",
                "regular-info-bar-bgcl": "var(--tdc-regular-info-bar-bgcl)",
            },
            fontSize: {
                "user-avt-fsize": "var(--tdc-user-avt-fsize)",
            },
            width: {
                "convs-card-width": "var(--tdc-convs-card-width)",
                "convs-list-width": "var(--tdc-convs-list-width)",
                "chat-container-width": "var(--tdc-chat-container-width)",
                "info-bar-width": "var(--tdc-info-bar-width)",
                "info-bar-mb-width": "var(--tdc-info-bar-mb-width)",
                "chat-n-info-container-width": "var(--tdc-chat-n-info-container-width)",
                "messages-list-width": "var(--tdc-messages-list-width)",
                "msgs-container-width": "var(--tdc-msgs-container-width)",
                "type-message-bar-width": "var(--tdc-type-message-bar-width)",
            },
            height: {
                "header-height": "var(--tdc-header-height)",
                "chat-container-height": "var(--tdc-chat-container-height)",
            },
            inset: {
                "slide-info-bar": "var(--tdc-info-bar-width)",
                "slide-info-mb-bar": "var(--tdc-info-bar-mb-width)",
            },
            transitionTimingFunction: {
                "slide-info-bar-timing": "var(--tdc-slide-info-bar-timing)",
            },
            translate: {
                "slide-chat-container": "var(--tdc-slide-chat-container)",
                "slide-header-icons": "var(--tdc-slide-header-icons)",
            },
            animation: {
                "grow-icon": "grow-icon 0.4s forwards ease-out",
                "hide-icon": "hide-icon 0.4s forwards ease-out",
                "hide-placeholder": "hide-placeholder 0.3s forwards ease-in",
                "grow-placeholder": "grow-placeholder 0.3s forwards ease-out",
                "zoom-fade-in": "zoom-in 0.15s forwards ease, fade-in 0.15s forwards ease",
                "zoom-fade-out": "zoom-out 0.15s forwards ease, fade-out 0.15s forwards ease",
                "super-zoom-out-fade-in":
                    "super-zoom-out 0.15s forwards ease, fade-in 0.15s forwards ease",
                "super-zoom-in-fade-out":
                    "super-zoom-in 0.15s forwards ease, fade-out 0.15s forwards ease",
                "disappear-zoom-out-s40": "disappear-zoom-out-s40 0.15s forwards linear",
                "appear-zoom-in-s40": "appear-zoom-in-s40 0.15s forwards linear",
            },
        },
    },
    plugins: [],

    // corePlugins: {
    // 	preflight: false,
    // }
}
export default config
