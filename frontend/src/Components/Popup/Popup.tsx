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

    const handleTouchEnd = () => {
        if (touchEnd - touchStart > MAX_SLAG) {
            // do your stuff here for left swipe
            toggleMenu()
            return;
        }

        resetTouchAxis()
    }

    const toggleMenu = () => {
        props.toggle()
        resetTouchAxis()
    }

    const slack = (touchEnd - touchStart) * SLAG_FACTOR

    return (
        <>
            {props.display && <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onClick={toggleMenu} className={'fixed top-0 left-0 w-screen h-screen backdrop-blur-2xl bg-black opacity-30'}></div>}
            <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={'fixed ' + (props.display ? 'bottom-0' : '-bottom-[100%]') + ' w-screen h-[80%] transition-all duration-200 fixed z-10 bg-background-primary rounded-t-3xl'}
                style={(slack > 0 && props.display ? {bottom: -(slack), transitionDuration: '0ms'} : {})}
            >
                <div className={'absolute top-5 m-auto left-0 right-0 w-10 h-1 bg-gray-300 rounded'}></div>
                {props.children}
            </div>
        </>
    );
}

export default Popup