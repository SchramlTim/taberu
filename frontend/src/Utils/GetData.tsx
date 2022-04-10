export const getData = async (url = '', data = {}) => {
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
    return response.json();
}