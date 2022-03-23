import React, {createContext, FC, useState} from "react";


type UserContextState = {
    user: {
        name: string,
        auth: boolean,
    },
    login: any,
};

const contextDefaultValues: UserContextState = {
    user: {
        name: '',
        auth: false,
    },
    login: () => {},
};

export const UserContext = createContext(contextDefaultValues);

export const UserProvider: FC = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState<object>(contextDefaultValues.user);

    // Login updates the user data with a name parameter
    const login = (name: string) => {
        setUser((user) => ({
            name: name,
            auth: true,
        }));
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user: contextDefaultValues.user, login: setUser }}>
            {children}
        </UserContext.Provider>
    );
}