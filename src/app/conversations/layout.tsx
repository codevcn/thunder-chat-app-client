import { RouteGuard } from "@/components/resourceGuard"

const PageLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <RouteGuard>
            {children}
        </RouteGuard>
    )
}

export default PageLayout