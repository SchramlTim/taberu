import React, { useState, useEffect } from 'react';
import TextInput from '../../Components/TextInput/TextInput'
import Button from "../../Components/Button/Button";


function BowlCreate() {

    return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-[80%]'}>
                <form onSubmit={() => {
                }} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                    <TextInput
                        title='Bowl Name'
                        placeholder='Bowl Name'
                        id='bowlname'
                        type='text'
                        onChange={() => {
                        }}
                    />
                    <TextInput
                        title='Description'
                        placeholder='Description'
                        id='description'
                        type='text'
                        onChange={() => {
                        }}
                    />
                    <TextInput
                        title='Order Deadline'
                        placeholder='Order Deadline'
                        id='orderDateline'
                        type='datetime-local'
                        onChange={() => {
                        }}
                    />
                    <TextInput
                        title='Arrive Date'
                        placeholder='Arrive Date'
                        id='arriveDate'
                        type='datetime-local'
                        onChange={() => {
                        }}
                    />
                    <div className={'flex items-center justify-between'}>
                        <Button type={'submit'} text={'Create Bowl'} />
                    </div>
                </form>
            </div>
        </div>
    );
  }

export default BowlCreate;