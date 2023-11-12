type TMsgAppendixProps = Partial<{
    color: '#212121' | '#766AC8',
    className: string,
}>

/**
* @param params.color #212121 is regular dark gray, #766AC8 is regular violet
*/
export const MsgAppendix = ({
    color,
    className,
}: TMsgAppendixProps) => {
    return (
        <svg
            className={`MsgAppendix ${className ? className : ''} h-fit w-fit`}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 45 68"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
        >
            <path
                d="M4.978393,4.473727v59.75852h40.119811C17.696099,60.593047,6.287219,24.636532,4.978393,4.473727Z"
                transform="matrix(.725408 0 0 1.070977-1.611366-2.791259)"
                fill={color ? color : "#212121"}
                stroke={color ? color : "#212121"}
                strokeWidth="0.5"
            />
        </svg>
    )
}