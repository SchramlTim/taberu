export const get = async (url = '', data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-token': sessionStorage.getItem('token') ?? ''
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });

    if (!response.ok) {
        throw Error('error while send data')
    }

    return response.json();
}

export const post = async (url = '', data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    if (!response.ok) {
        throw Error('error while send data')
    }

    return response.json(); // parses JSON response into native JavaScript objects
}