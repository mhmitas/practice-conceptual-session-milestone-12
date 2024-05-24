import { categories } from '../../Categories/CategoriesData'
import { useState } from 'react'
import { DateRange } from "react-date-range";
import { useForm } from "react-hook-form";


const AddRoomForm = ({ setDates, dates, handleFormSubmit }) => {
    const { register, handleSubmit, } = useForm()
    const [imagePreview, setImagePreview] = useState(null);

    function handleImageChange(e) {
        const file = e.target.files[0]
        const imageUrl = URL.createObjectURL(file)
        setImagePreview(imageUrl);
    }

    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 py-6'>
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='location' className='block text-gray-600'>
                                Location
                            </label>
                            <input
                                // onChange={handleOnChange}
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='location'
                                id='location'
                                type='text'
                                {...register('location')}
                                placeholder='Location'
                                required
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='category' className='block text-gray-600'>
                                Category
                            </label>
                            <select
                                required
                                className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                                name='category'
                                {...register('category')}
                            >
                                {categories.map(category => (
                                    <option value={category.label} key={category.label}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Calender */}
                        <div className='space-y-1'>
                            <label htmlFor='location' className='block text-gray-600'>
                                Select Availability Range
                            </label>
                            {/* Calender */}
                            <DateRange
                                rangeColors={['#38c953']}
                                editableDateInputs={true}
                                onChange={item => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                            />

                        </div>
                    </div>
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='title' className='block text-gray-600'>
                                Title
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='title'
                                id='title'
                                type='text'
                                {...register('title')}
                                placeholder='Title'
                                required
                            />
                        </div>
                        {/* image */}
                        <div className=' p-4 bg-white w-full  m-auto rounded-lg grid grid-cols-2'>
                            <div className='file_upload relative rounded-lg h-max m-auto'>
                                <div className='flex flex-col w-max mx-auto text-center '>
                                    <label>
                                        <input
                                            className='text-sm cursor-pointer w-36 hidden'
                                            type='file'
                                            {...register('image', { onChange: handleImageChange }, { required: true },)}
                                            name='image'
                                            id='image'
                                            accept='image/*'
                                            hidden
                                        />
                                        <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                                            Upload image
                                        </div>
                                    </label>
                                </div>
                            </div>
                            {/* imagge preview */}
                            <div className='max-w-48 '>
                                {imagePreview && <img src={imagePreview} className='rounded-lg' />}
                            </div>
                        </div>

                        <div className='flex justify-between gap-2'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='price' className='block text-gray-600'>
                                    Price
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='price'
                                    id='price'
                                    type='number'
                                    {...register('price')}
                                    placeholder='Price'
                                    required
                                />
                            </div>

                            <div className='space-y-1 text-sm'>
                                <label htmlFor='guest' className='block text-gray-600'>
                                    Total guest
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='total_guest'
                                    id='guest'
                                    type='number'
                                    {...register('total_guest')}
                                    placeholder='Total guest'
                                    required
                                />
                            </div>
                        </div>

                        <div className='flex justify-between gap-2'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='bedrooms' className='block text-gray-600'>
                                    Bedrooms
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='bedrooms'
                                    id='bedrooms'
                                    type='number'
                                    {...register('bedrooms')}
                                    placeholder='Bedrooms'
                                    required
                                />
                            </div>

                            <div className='space-y-1 text-sm'>
                                <label htmlFor='bathrooms' className='block text-gray-600'>
                                    Bathrooms
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='bathrooms'
                                    id='bathrooms'
                                    type='number'
                                    {...register('bathrooms')}
                                    placeholder='Bathrooms'
                                    required
                                />
                            </div>
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='description' className='block text-gray-600'>
                                Description
                            </label>

                            <textarea
                                {...register('description')}
                                id='description'
                                className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                                name='description'
                            ></textarea>
                        </div>
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                >
                    Save & Continue
                </button>
            </form>
        </div>
    )
}

export default AddRoomForm

// from date-range documentations
/*
<DateRange
    className='shadow-lg'
    editableDateInputs={true}
    showDateDisplay={false}
    onChange={function (item) {
        handleDates(item)
    }}
    moveRangeOnFirstSelection={false}
    ranges={[dates]}
/>


*/