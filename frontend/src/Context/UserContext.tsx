import React, {createContext, FC, useState} from "react";


type UserState = {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    paypalUsername: string,
    phoneNumber: string,
    selfLink: string,
    token: boolean,
}





type UserProviderState = {
    user: UserState | undefined,
    login(userData: UserState): void,
}

const contextDefaultValues: UserProviderState  = {
    user: undefined,
    login: (userData) => {},
};

export const UserContext = createContext(contextDefaultValues);

export const UserProvider: FC = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [userData, setUser] = useState<UserState>();
    const login = (userData: UserState) => setUser(userData)
    const logout = () => setUser(undefined)

    return (
        <UserContext.Provider value={{ user: userData, login: setUser }}>
            {children}
        </UserContext.Provider>
    );
}