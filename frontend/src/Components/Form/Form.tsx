import React, {useContext} from "react";
import {FormContext, FormProvider} from "../../Context/FormContext";

type MethodTypes = 'GET' | 'POST' | 'DELETE' | 'PUT' | undefined

function ErrorBox(props: { error: Error }) {
    return <span>{props.error.message}</span>;
}

function Form(props: {
    name: string,
    method: MethodTypes,
    action: string,
    afterSubmit?: (response: Response) => any,
    children?: React.ReactNode
    className: string
}) {

    const { state, addGlobalError } = useContext(FormContext);

    const sendRequest = async (e: any) => {
        e.preventDefault()

        if (state.fieldErrors.length) {
            addGlobalError(new Error('Please fix all input errors'))
            return;
        }

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

    const errors = state.globalErrors.map((error, index) => <ErrorBox key={index} error={error}/>)
    return (
            <form
                name={props.name}
                className={props.className}
                onSubmit={sendRequest}
            >
                {state.globalErrors && errors}
                {props.children}
            </form>
    );
}

export default Form