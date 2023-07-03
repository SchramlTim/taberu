import React from 'react'
import Header from '../../Components/Header/Header'

const DefaultLayout = ({ children }: any) => (
    <div className={'h-full w-full font-quicksand bg-background-primary'}>
        <Header />
        <div className={'mt-10'}>{children}</div>
    </div>
)

export { DefaultLayout }
