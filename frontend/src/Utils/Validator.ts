export const validateEmail = (email: string | undefined) => {
    const isValid = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    if (!isValid) {
        throw new Error('Email address is not in the correct format')
    }
}

export const validateNotEmpty = (input: string | undefined) => {
    const isValid = !!input?.length
    if (!isValid) {
        throw new Error('Please fill required fields')
    }
}

export const validateContainsSpecialCharacter= (input: string | undefined) => {
    const isValid = /(?=.*[@$!%*?&])+/.test(input ?? '')
    if (!isValid) {
        throw new Error('Need to contain one of @$!%*?&')
    }
}

export const validateLength= (input: string | undefined, length: number) => {
    const isValid = String(input).length >= length
    if (!isValid) {
        throw new Error(`Must contain at least ${length} characters`)
    }
}