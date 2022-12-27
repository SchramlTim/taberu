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
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-token': sessionStorage.getItem('token') ?? ''
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw Error('error while send data')
    }

    return await response.json(); // parses JSON response into native JavaScript objects
}
