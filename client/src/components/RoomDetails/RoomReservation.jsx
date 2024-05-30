import PropTypes from 'prop-types'
import Button from '../Shared/Button/Button'
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import RoomBookingModal from '../modals/RoomBookingModal';

const RoomReservation = ({ room }) => {
  // console.log(new Date(room.from.toLocaleString()));
  // console.log(new Date(room.to.toLocaleString()));
  const [state, setState] = useState([
    {
      startDate: new Date(room.from),
      endDate: new Date(room.to),
      key: 'selection'
    }
  ]);
  const [showModal, setShowModal] = useState(false)

  const totalDays = differenceInCalendarDays(
    new Date(room.to),
    new Date(room.from),
  )
  const totalPrice = Number(room.price) * totalDays
  // console.log('totalPrice');

  function modalHandler() {
    setShowModal(false)
    console.log(`'Book a room`);
  }

  return (
    <div className='rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white'>
      <div className='flex items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {room?.price}</div>
        <div className='font-light text-neutral-600'>night</div>
      </div>
      <hr />
      <div className='flex justify-center'>
        {/* Calender */}
        <DateRange
          editableDateInputs={true}
          onChange={item => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
      <hr />
      <div className='p-4 flex items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div> ${totalPrice}</div>
      </div>
      <hr />
      <div className='p-4'>
        <Button onClick={() => setShowModal(true)} label={'Reserve'} />
      </div>
      {showModal && <RoomBookingModal bookingInfo={{ ...room }} setShowModal={setShowModal} modalHandler={modalHandler} />}
    </div>
  )
}

RoomReservation.propTypes = {
  room: PropTypes.object,
}

export default RoomReservation
