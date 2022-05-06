import React, {createContext, FC, useState} from "react";

type UserState = {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    paypalUsername: string,
    phoneNumber: string,
    selfLink: string,
}

type UserResponse = {
    user: UserState,
    token: string
}

type UserProviderState = {
    user: UserState | undefined,
    login(userData: UserResponse): void,
    logout(): void,
}

const contextDefaultValues: UserProviderState  = {
    user: undefined,
    login: (userData) => {},
    logout: () => {},
};

const sessionUser = sessionStorage.getItem('user');
contextDefaultValues.user = sessionUser ? JSON.parse(sessionUser) : undefined
export const UserContext = createContext(contextDefaultValues);

export const UserProvider: FC = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [userData, setUser] = useState<UserState|undefined>(contextDefaultValues.user);
    const login = (userData: UserResponse) => {
        sessionStorage.setItem('user', JSON.stringify(userData.user))
        sessionStorage.setItem('token', userData.token)
        setUser(userData.user)
    }
    const logout = () => {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        setUser(undefined);
    }

    return (
        <UserContext.Provider value={{ user: userData, login: login, logout: logout }}>
            {children}
        </UserContext.Provider>
    );
}