import React, { useEffect, useState } from 'react'

function Timer(props: { finishDate: string | undefined }) {
    const deadline = props.finishDate
    const [time, setTime] = useState<{
        days: number
        hours: number
        minutes: number
        seconds: number
    }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    const calculateTimeFormat = (date: string) => {
        const now = new Date()
        const finishDate = new Date(date)
        const seconds = finishDate.getTime() - now.getTime()
        return {
            days: Math.floor(seconds / (1000 * 60 * 60 * 24)),
            hours: Math.floor((seconds / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((seconds / 1000 / 60) % 60),
            seconds: Math.floor((seconds / 1000) % 60),
        }
    }

    useEffect(() => {
        deadline &&
            deadline.length &&
            setInterval(() => setTime(calculateTimeFormat(deadline)), 1000)
    }, [deadline])

    const zeroPad = (num: number, places: number) =>
        String(num).padStart(places, '0')

    return (
        <div
            className={
                'flex w-full h-10 bg-gray-200 p-2 rounded justify-center items-center'
            }
        >
            {time.days > 0 && (
                <span className={'mr-3'}>
                    {zeroPad(time.hours > 0 ? time.hours : 0, 2)} Days
                </span>
            )}
            <span>
                {!deadline ? '??' : zeroPad(time.hours > 0 ? time.hours : 0, 2)}
                :
            </span>
            <span>
                {!deadline
                    ? '??'
                    : zeroPad(time.minutes > 0 ? time.minutes : 0, 2)}
                :
            </span>
            <span>
                {!deadline
                    ? '??'
                    : zeroPad(time.seconds > 0 ? time.seconds : 0, 2)}
            </span>
        </div>
    )
}

export default Timer
