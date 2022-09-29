import React, {useState} from "react";

type InputTypes = 'text' | 'number' | 'password' | undefined

function Input(props: {
    identifier: string,
    title: string,
    placeholder: string,
    validation: (input: string) => any,
    type?: InputTypes
}) {

    const [error, setError] = useState<string|boolean>(false)

    return (
        <div className={"mb-4"}>
            <label className={"block text-gray-700 text-sm font-bold mb-2" + ((error && ' text-red-500') || '')} htmlFor={props.identifier}>
                {props.title}
            </label>
            <input
                onBlur={(event) => {
                    try {
                        props.validation(event.target.value)
                    } catch (error) {
                        let message = String(error)
                        if (error instanceof Error) {
                            message = error.message
                        }
                        setError(message)
                    }
                }}
                className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  + ((error && ' bg-red-300') || '')}
                id={props.identifier} type={props.type ?? 'text'} placeholder={props.placeholder}
                onChange={() => setError(false)}
            />
            {error &&
                <span className={'text-xs text-red-500'}>{error}</span>
            }
        </div>
    );
}

export default Input