
type TIconButtonProps = {
    children: JSX.Element,
    className?: string,
    onClick?: (...params: any) => void,
    title?: string,
}

export const IconButton = ({
    children,
    className,
    onClick,
    title,
}: TIconButtonProps) => {
    return (
        <div
            className={`IconButton ${className || ''} p-2.5 transition duration-200 hover:bg-regular-icon-btn-cl cursor-pointer rounded-full`}
            title={title || ''}
            onClick={onClick}
        >
            {children}
        </div >
    )
}