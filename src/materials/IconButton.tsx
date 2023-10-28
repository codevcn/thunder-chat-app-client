
type TIconButton = {
    children: JSX.Element,
    className?: string,
    onClick?: (params: any) => void,
    title?: string,
}

export const IconButton = ({
    children,
    className,
    onClick,
    title,
}: TIconButton) => {
    return (
        <div
            className={`My-IconButton ${className || ''} p-2.5 transition duration-200 hover:bg-regular-IconButton cursor-pointer rounded-full`}
            title={title || ''}
            onClick={onClick}
        >
            {children}
        </div >
    )
}