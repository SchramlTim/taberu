import React, { useState } from 'react'

type HeadlineProps = {
    title: string
}

function HorizontalSlide(props: {
    headlines?: Array<HeadlineProps>
    children?: React.ReactNode
}) {
    const [page, setPage] = useState<number>(0)

    const SLAG_FACTOR = 0.3
    const MAX_SLAG = 150
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)

    const resetTouchAxis = () => {
        setTouchStart(0)
        setTouchEnd(0)
    }

    const handleTouchStart = (e: any) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: any) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = (e: any) => {
        if (touchEnd - touchStart > MAX_SLAG) {
            // do your stuff here for left swipe
            const nextPage = page - 1
            setPage(nextPage > 0 ? page : 0)
        }

        if (touchEnd - touchStart < -MAX_SLAG) {
            // do your stuff here for right swipe
            const nextPage = page + 1
            const maxPage = Math.max(
                Object.keys(props.children ?? {}).length - 1,
                0
            )

            setPage(Math.min(Math.max(nextPage, 0), maxPage))
        }

        resetTouchAxis()
    }

    const slack =
        touchEnd > 0 && touchStart > 0
            ? (touchEnd - touchStart) * SLAG_FACTOR
            : 0

    return (
        <div className={'w-full h-full overflow-x-hidden'}>
            {props.headlines && (
                <div className={'flex mt-5 pl-5 pr-5 justify-between'}>
                    {props.headlines.map((headline, index) => (
                        <div
                            className={
                                (index === page
                                    ? 'outline outline-offset-2 outline-4'
                                    : 'text-gray-600') +
                                ' outline-primary bg-gray-300 rounded p-2'
                            }
                            key={index}
                            onClick={() => setPage(index)}
                        >
                            {headline.title}
                        </div>
                    ))}
                </div>
            )}
            <div
                className={
                    'flex flex-nowrap flex-row w-full h-full transition-all duration-75'
                }
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ translate: `calc(-${100 * page}% + ${slack}px)` }}
            >
                {props.children}
            </div>
        </div>
    )
}

export default HorizontalSlide
