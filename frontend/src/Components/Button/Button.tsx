import React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {twMerge} from "tailwind-merge";

type ButtonTypes = 'button' | 'submit' | 'reset' | undefined

const buttonVariants = cva([
    "w-full",
    "py-2",
    "px-4",
    "rounded",
    "focus:outline-none",
    "focus:shadow-outline", "mt-2"
], {
    variants: {
        intent: {
            primary: ["bg-button-primary"],
            secondary: ["bg-button-secondary", "border-4 border-double border-text-primary"],
        },
    },
    defaultVariants: {
        intent: "primary",
    },
});

function Button(props: {
    type: ButtonTypes,
    variant: 'primary' | 'secondary',
    text: string,
    onClick?: (e: any) => any,
} = {type: "button", variant: "primary", text: ""}) {
    const button = (variants: VariantProps<typeof buttonVariants>) => twMerge(buttonVariants(variants));
    return (
        <button
            className={button({intent: props.variant})}
            onClick={props.onClick}
            type={props.type}>
            {props.text}
        </button>
    );
}

export default Button