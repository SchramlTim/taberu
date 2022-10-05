import React from "react";

type ButtonTypes = 'button' | 'submit' | 'reset' | undefined

function Button(props: {
    type: ButtonTypes,
    text: string,
    onClick?: (e: any) => any
}) {

    return (
        <button
            className={"bg-primary w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"}
            onClick={props.onClick}
            type={props.type}>
            {props.text}
        </button>
    );
}

export default Button