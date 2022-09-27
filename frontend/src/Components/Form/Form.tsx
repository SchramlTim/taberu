import React from "react";

type MethodTypes = 'GET' | 'POST' | 'DELETE' | 'PUT' | undefined

function Form(props: {
    name: string,
    method: MethodTypes,
    action: string,
    afterSubmit?: (response: Response) => any,
    children?: React.ReactNode
    className: string
}) {

    const sendRequest = async (e: any) => {
        e.preventDefault()

        const elements = [...e.target.elements]
        const data = elements.reduce((acc, elem) => {
            if (elem.id) {
                acc[elem.id] = elem.value
            }

            return acc
        }, {})

        const response = await fetch(props.action, {
            method: props.method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-token': sessionStorage.getItem('token') ?? ''
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });

        if (props.afterSubmit) {
            props.afterSubmit(response);
        }
    }

    return (
        <form
            name={props.name}
            className={props.className}
            onSubmit={sendRequest}
        >
            {props.children}
        </form>
    );
}

export default Form