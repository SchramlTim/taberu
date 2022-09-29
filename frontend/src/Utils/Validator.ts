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