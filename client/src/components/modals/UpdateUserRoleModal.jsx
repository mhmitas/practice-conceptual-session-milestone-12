import React, { useState } from 'react';

const UpdateUserRoleModal = ({ setShowModal, modalHandler, role }) => {
    const [select, setSelect] = useState(role)

    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            setShowModal(false)
        }
    }
    return (
        <div onClick={handleOverlayClick} className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
            <div className='shadow-xl p-6 bg-white w-full max-w-md rounded-md mx-auto'>
                <div>
                    <h2 className="text-xl mb-4 font-semibold">Update User Role</h2>
                    <select
                        defaultValue={select}
                        onChange={(e) => { setSelect(e.target.value) }}
                        className="block w-full mb-4 p-2 border rounded">
                        <option value="guest">Guest</option>
                        <option value="host">Host</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex justify-center space-x-4 mt-8">
                    <button
                        disabled={!select && true}
                        onClick={() => modalHandler(select)}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded transition-transform transform hover:bg-blue-600 active:scale-95 disabled:cursor-not-allowed">
                        Update
                    </button>
                    <button
                        onClick={() => setShowModal(false)}
                        className="bg-rose-500 text-white font-semibold py-2 px-4 rounded transition-transform transform hover:bg-rose-600 active:scale-95" >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserRoleModal;
