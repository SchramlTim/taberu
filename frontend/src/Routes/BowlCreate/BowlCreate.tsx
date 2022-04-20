import React, { useState, useEffect } from 'react';

function BowlCreate() {

    return (
        <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'w-full max-w-[80%]'}>
                <form onSubmit={() => {}} className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'}>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-700 text-sm font-bold mb-2'} htmlFor="username">
                            Bowl Name
                        </label>
                        <input
                            onChange={({currentTarget}) => console.log('')}
                            className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                            id="username" type="text" placeholder="Username"/>
                    </div>
                    <div className={'flex items-center justify-between'}>
                        <button
                            className={'bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}
                            type="submit">
                            Create Bowl
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
  }

export default BowlCreate;