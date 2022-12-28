import React, {createContext} from "react";
import { BowlProps } from "../Utils/Types";

export const BowlContext = createContext({
    bowl: {} as BowlProps | undefined
})

export const BowlProvider = BowlContext.Provider 
