import React, { useState } from 'react';
import AddRoomForm from '../../../../components/dashboard/forms/AddRoomForm';

const AddRoom = () => {
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    })
    return (
        <div>
            {/* add room form */}
            <AddRoomForm />
        </div>
    );
};

export default AddRoom;