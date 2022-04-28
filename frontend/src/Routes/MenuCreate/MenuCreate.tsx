import React, { useState, useEffect } from 'react';
import TextInput from '../../Components/TextInput/TextInput'
import {post} from "../../Utils/Request";

function MenuCreate() {

    const [name, setMenuName] = useState('');
    const [description, setDescription] = useState('');

    const createMenu = () => {
        post('/v1/menus', {
            name,
            description
        })
    }


    return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-[80%]'}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    createMenu()
                }} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                    <TextInput
                        title='Menu Name'
                        placeholder='Menu Name'
                        id='name'
                        type='text'
                        onChange={(e) => {setMenuName(e.target.value)}}
                    />
                    <TextInput
                        title='Description'
                        placeholder='Description'
                        id='description'
                        type='text'
                        onChange={(e) => {setDescription(e.target.value)}}
                    />
                    <div className={'flex items-center justify-between'}>
                        <button
                            className={'bg-primary hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}
                            type="submit">
                            Create Bowl
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
  }

export default MenuCreate;