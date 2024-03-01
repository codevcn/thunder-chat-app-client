import { Flex } from 'antd'
import { useEffect, useState } from 'react'

type TProgressiveImageProps = {
    src: string,
    alt?: string,
    className?: string,
    textPrgssClassName?: string,
    progress?: JSX.Element,
    prgssClassName?: string
}

export const ProgressiveImage = ({ src, alt, className, textPrgssClassName, progress, prgssClassName }: TProgressiveImageProps) => {
    const [imgSrc, setImgSrc] = useState<string>()

    useEffect(() => {
        const image = new Image()

        image.src = src

        image.onload = () => {
            setImgSrc(image.src)
        }
    }, [src])

    return (
        imgSrc ? (
            <img
                src={imgSrc}
                alt={alt || 'Unknown'}
                className={className || ''}
            />
        ) : progress || (
            <Flex
                className={prgssClassName || ''}
            >
                <div
                    className={`${textPrgssClassName || ''} m-auto`}
                >
                    Loading...
                </div>
            </Flex>
        )
    )
}