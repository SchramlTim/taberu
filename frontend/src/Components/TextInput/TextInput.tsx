import React from "react";

function TextInput(props: {
    onChange: ({currentTarget}: any) => void ,
    type: string,
    id: string,
    title: string,
    placeholder: string,
}) {
    return (
        <div className={"mb-4"}>
            <label className={"block text-gray-700 text-sm font-bold mb-2"} htmlFor={props.id}>
                {props.title}
            </label>
            <input
                onChange={props.onChange}
                className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                id={props.id} type={props.type} placeholder={props.placeholder}/>
        </div>
    );
}

export default TextInput