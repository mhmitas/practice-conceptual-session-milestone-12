import React from 'react';

const Test = () => {
    console.log('Test');
    function handleTest(e) {
        console.log(e.target);
    }
    return (
        <div className='my-6'>
            <input className='outline-gray-800 bg-slate-500 p-4' onChange={handleTest} type="text" />
        </div>
    );
};

export default Test;