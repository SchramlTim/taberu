import React, {createContext, FC, useState} from "react";

type FormState = {
    fieldErrors: FormFieldError[],
    globalErrors: Error[],
}

type FormFieldError = {
    identifier: string,
    error: Error
}

type FormProviderState = {
    state: FormState,
    addFieldError(identifier: string, error: Error): void,
    addGlobalError(error: Error): void,
    removeFieldError(identifier: string): void,
}

const contextDefaultValues: FormProviderState  = {
    state: {
        fieldErrors: [],
        globalErrors: [],
    },
    addFieldError: (identifier: string, error: Error) => {},
    addGlobalError: (error: Error) => {},
    removeFieldError: (identifier: string) => {},
};

export const FormContext = createContext(contextDefaultValues);

export const FormProvider: FC = ({ children }) => {
    const [fieldErrors, setFieldErrors] = useState<FormFieldError[]>(contextDefaultValues.state.fieldErrors);
    const [globalErrors, setGlobalErrors] = useState<Error[]>(contextDefaultValues.state.globalErrors);

    const addFieldError = (identifier: string, error: Error) => {
        const fieldErrorExist = !!fieldErrors.filter((entry) => entry.identifier === identifier).length
        if (!fieldErrorExist) {
            setFieldErrors([...fieldErrors, {identifier, error}])
        }
    }
    const addGlobalError = (error: Error) => {
        const globalErrorExist = !!globalErrors.filter((entry) => entry.message === error.message).length
        if (!globalErrorExist) {
            setGlobalErrors([...globalErrors, error])
        }
    }
    const removeFieldError = (identifier: string) => {
        const errorList = fieldErrors.filter((entry) => entry.identifier !== identifier)
        setFieldErrors([...errorList])
    }

    return (
        <FormContext.Provider value={{ state: {fieldErrors, globalErrors}, addFieldError, addGlobalError, removeFieldError }}>
            {children}
        </FormContext.Provider>
    );
}