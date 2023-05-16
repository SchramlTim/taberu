import React from "react";

type ButtonTypes = 'button' | 'submit' | 'reset' | undefined

function Button(props: {
    type: ButtonTypes,
    variant: 'primary' | 'secondary',
    text: string,
    onClick?: (e: any) => any,
} = {type: "button", variant: "primary", text: ""}) {

    const type = props.variant === "primary" ? "bg-button-primary" : "bg-button-secondary"
    return (
        <button
            className={type + " w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"}
            onClick={props.onClick}
            type={props.type}>
            {props.text}
        </button>
    );
}

export default Button