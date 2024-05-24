import React, { useState } from 'react';
import AddRoomForm from '../../../../components/dashboard/forms/AddRoomForm';
import { imageUpload } from '../../../../api/utils/utils';
import useAuth from '../../../../hooks/useAuth';
import { useMutation } from "@tanstack/react-query";
import axiosInstance from '../../../../hooks/axiosInstance';

const AddRoom = () => {
    const { user } = useAuth()

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    const { mutateAsync } = useMutation({
        mutationFn: async (roomData) => {
            const result = await axiosInstance.post('/rooms', roomData)
            return result
        },
    })

    async function handleFormSubmit(roomData) {
        // console.table(roomData)
        if (roomData.image[0]) {
            const imageFile = roomData.image[0]
            const imageUrl = await imageUpload(imageFile)
            roomData.image = imageUrl;
        } else {
            roomData.image = 'https://i.ibb.co/hLSm4c1/travelars.png'
        }
        const host = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL
        }
        const from = dates[0].startDate
        const to = dates[0].endDate
        try {
            const postData = { ...roomData, from, to, host }
            console.table(postData)
            const result = await mutateAsync(postData)
            console.log(result);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            {/* add room form */}
            <AddRoomForm
                setDates={setDates}
                dates={dates}
                handleFormSubmit={handleFormSubmit}
            />
        </div>
    );
};


export default AddRoom;