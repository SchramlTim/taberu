import React, {useEffect, useState} from 'react'

function Timer (props: {finishDate: string}) {
    const [seconds, setSeconds] = useState<number>(0)

    useEffect(() => {
        setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
    }, [seconds]);

    const calculateTimeFormat = (date: string) => {
        const now = new Date()
        const finishDate = new Date(date)
        const seconds = (finishDate.getTime() - now.getTime());
        return {
            days: Math.floor(seconds / (1000 * 60 * 60 * 24)),
            hours: Math.floor((seconds / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((seconds / 1000 / 60) % 60),
            seconds: Math.floor((seconds / 1000) % 60)
        }
    }

    const time = calculateTimeFormat(props.finishDate)
    const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

    return (
        <div className={'flex w-full h-10 bg-gray-200 rounded justify-center items-center'}>
            <span>{zeroPad(
                time.hours > 0 ? time.hours : 0,
                2)}:</span>
            <span>{zeroPad(
                time.minutes > 0 ? time.minutes : 0,
                2)}:</span>
            <span>{zeroPad(
                time.seconds > 0 ? time.seconds : 0,
                2)}</span>
        </div>
    )
}

export default Timer