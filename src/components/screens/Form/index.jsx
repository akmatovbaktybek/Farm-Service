import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SelectLabels from '../../ui/Select'
import { getMedicine } from '../../../store/slices/medicinesSlice'

const MedicineForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, control } = useForm()
    const { medicines } = useSelector((state) => state.medicine)

    // const onSubmit = async (data) => {
    //     const formData = {
    //         navigateToVacancies: () => navigate('/form'),
    //         medicineData: data,
    //     }
    //     console.log(formData)s
    //     dispatch(orderMedicine(formData))
    // }

    useEffect(() => {
        dispatch(getMedicine())
    }, [])

    console.log(medicines);


    return (
        <div className="container mx-auto my-10 px-5">
            <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Заполните форму
            </h1>


            <div className="flex min-h-full  flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form  >
                        {/* <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Ваше имя
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="first-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Ваша фамилия
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    autoComplete="first-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Филиал
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    autoComplete="first-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Адресс филиала
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    autoComplete="first-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div> */}

                        {/* <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Наименование лекарства
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    autoComplete="first-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>



                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Количество лекарства
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    autoComplete="first-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div> */}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Лекарство
                            </label>
                            <div className="mt-2">
                                <SelectLabels
                                    placeholder={'Выберите лекарство'}
                                    control={control}
                                    name={'medicine'}
                                // options={positions}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            {/* <Link to={'/'}>

                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Отменить
                                </button>
                            </Link> */}

                            <button
                                type="submit"
                                className="rounded-md bg-lime-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
                            >
                                Отправить
                            </button>

                        </div>
                    </form>


                </div>
            </div>
        </div >
        // <div>
        //     <form onSubmit={handleSubmit(handleAddMedicine)}>
        //         <select name="medicine" ref={register}>
        //             {medicines.map((medicine) => (
        //                 <option key={medicine.id} value={medicine.id}>
        //                     {medicine.name}
        //                 </option>
        //             ))}
        //         </select>
        //         <input type="number" name="quantity" ref={register} />
        //         <button type="submit">Add</button>
        //     </form>
        //     {selectedMedicines.length > 0 && (
        //         <div>
        //             <h2>Selected Medicines</h2>
        //             <ul>
        //                 {selectedMedicines.map((selectedMedicine, index) => (
        //                     <li key={index}>
        //                         Medicine: {medicines.find((medicine) => medicine.id === selectedMedicine.medicine)?.name}, Quantity: {selectedMedicine.quantity}
        //                     </li>
        //                 ))}
        //             </ul>
        //             <button onClick={handleClearSelectedMedicines}>Clear Selected Medicines</button>
        //             <button onClick={handleConfirmOrder} disabled={submitStatus === 'loading'}>
        //                 Confirm Order
        //             </button>
        //         </div>
        //     )}
        // </div>
    )
}

export default MedicineForm

