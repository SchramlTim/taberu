import React from "react";

type ButtonTypes = 'button' | 'submit' | 'reset' | undefined


function Button(props: {
    type: ButtonTypes,
    text: string
}) {

    return (
        <button
            className={"bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
            type={props.type}>
            {props.text}
        </button>
    );
}

export default Button