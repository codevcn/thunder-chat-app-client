import type { ThemeConfig } from "antd"

export const CustomAntTheme: ThemeConfig = {
    components: {
        Input: {
            hoverBorderColor: "#6b7280",
            activeBorderColor: "#6b7280",
            paddingBlock: 8,
            paddingInline: 10,
        },
        Form: {
            itemMarginBottom: 0,
            labelFontSize: 14,
        },
        Button: {
            primaryShadow: "0 0 0 #fff",
            textHoverBg: "#212121",
            colorText: "#fff",
        },
    },
    token: {
        colorPrimary: "#6b7280",
        colorPrimaryHover: "#6b7280",
        colorPrimaryBgHover: "#6b7280",
        fontSize: 14,
        lineWidth: 2,
        purple: "#766AC8",
        colorInfo: "white",
        colorBgSpotlight: "#8b5cf6", //tooltip background-color
    },
}
