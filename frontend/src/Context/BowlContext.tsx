import React, { createContext } from 'react'
import { BowlProps } from '../Utils/Types'

export const BowlContext = createContext({} as BowlProps | undefined)

export const BowlProvider = BowlContext.Provider
