import React, {useState} from "react";


function Popup(props: {
    toggle: () => any
    display: boolean
    children?: React.ReactNode
}) {

    const MAX_SLAG = 150;
    const SLAG_FACTOR = 0.3;
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const resetTouchAxis = () => {
        setTouchStart(0)
        setTouchEnd(0)
    }

    const handleTouchStart = (e: any) => {
        setTouchStart(e.targetTouches[0].clientY);
    }

    const handleTouchMove = (e: any) => {
        setTouchEnd(e.targetTouches[0].clientY);
    }

    const handleTouchEnd = (e: any) => {
        if (touchEnd - touchStart > MAX_SLAG) {
            // do your stuff here for left swipe
            toggleMenu()
            return;
        }

        resetTouchAxis()
    }

    const toggleMenu = () => {
        props.toggle()
        // @ts-ignore
        resetTouchAxis()
    }

    document.body.style.overflow = props.display ? 'hidden' : 'scroll';

    const slack = (touchEnd - touchStart) * SLAG_FACTOR

    return (
        <>
            {props.display && <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onClick={toggleMenu} className={'fixed top-0 left-0 w-screen h-screen backdrop-blur-2xl bg-black opacity-30 z-40'}></div>}
            <div
                className={'fixed ' + (props.display ? 'bottom-0' : '-bottom-[100%]') + ' left-0 right-0 w-screen h-[80%] transition-all duration-200 fixed bg-background-primary rounded-t-3xl z-50'}
                style={(slack > 0 && props.display ? {bottom: -(slack), transitionDuration: '0ms'} : {})}
                onClick={(e: any) => e.stopPropagation()}
                onTouchStart={(e: any) => e.stopPropagation()} onTouchMove={(e: any) => e.stopPropagation()} onTouchEnd={(e: any) => e.stopPropagation()}
            >
                <div
                    className={'flex justify-center items-center w-full h-12'}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className={'w-10 h-1 bg-gray-300 rounded'}></div>
                </div>
                <div className={'mt-5 overflow-y-scroll h-[calc(100%-5rem)]'}>
                    {props.children}
                </div>
            </div>
        </>
    );
}

export default Popup