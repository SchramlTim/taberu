import React, {FocusEventHandler} from "react";

type InputTypes = 'text' | 'number' | 'password' | undefined

function Input(props: {
    identifier: string,
    title: string,
    placeholder: string,
    onBlur: (event: any) => any,
    type?: InputTypes
}) {

    return (
        <div className={"mb-4"}>
            <label className={"block text-gray-700 text-sm font-bold mb-2"} htmlFor={props.identifier}>
                {props.title}
            </label>
            <input
                onBlur={props.onBlur}
                className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                id={props.identifier} type={props.type ?? 'text'} placeholder={props.placeholder}/>
        </div>
    );
}

export default Input