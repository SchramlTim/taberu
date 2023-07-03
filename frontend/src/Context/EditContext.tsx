import React, { createContext, FC, useState } from 'react'

export const EditContext = createContext({
    isEditMode: false,
    startEditMode: () => {},
    endEditMode: () => {},
    toggleEditMode: () => {},
})

export const EditProvider: FC = ({ children }) => {
    const [isEditMode, setEditMode] = useState<boolean>(false)

    const startEditMode = () => {
        setEditMode(true)
    }

    const endEditMode = () => {
        setEditMode(false)
    }

    const toggleEditMode = () => {
        setEditMode(!isEditMode)
    }
    return (
        <EditContext.Provider
            value={{ isEditMode, startEditMode, endEditMode, toggleEditMode }}
        >
            {children}
        </EditContext.Provider>
    )
}
