import React, { useState } from 'react';
import AddRoomForm from '../../../../components/dashboard/forms/AddRoomForm';
import { useForm } from "react-hook-form";
import { imageUpload } from '../../../../api/utils/utils';

const AddRoom = () => {
    const { } = useForm()

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    async function handleFormSubmit(roomData) {
        // console.table(roomData)
        if (roomData.image[0]) {
            const imageFile = roomData.image[0]
            const imageUrl = await imageUpload(imageFile)
            roomData.image = imageUrl;
        }
        console.log(roomData.image);

    }

    return (
        <div>
            {/* add room form */}
            <AddRoomForm setDates={setDates} dates={dates} handleFormSubmit={handleFormSubmit} />
        </div>
    );
};

export default AddRoom;