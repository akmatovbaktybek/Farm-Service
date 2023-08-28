import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { refreshAccessToken } from '../../../store/slices/authSlice';

const MedicationForm = () => {
    const [medications, setMedications] = useState([]);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedMedications, setSelectedMedications] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const accessToken = useSelector(state => state.auth.accessToken);
    const dispatch = useDispatch();

    console.log(accessToken, 'accestoken')

    useEffect(() => {
        axios.get('https://www.farm-service-kg.com/application/')
            .then(response => {
                setMedications(response.data);
            })
            .catch(error => {
                console.error('Error fetching medications:', error);
            });
    }, []);

    const handleAddMedication = () => {
        if (selectedMedication && quantity > 0) {
            setSelectedMedications([...selectedMedications, { medication: selectedMedication, quantity }]);
            setSelectedMedication(null);
            setQuantity(1);
        }
    };

    const handleSendOrder = async () => {
        try {
            const orderData = {
                items: selectedMedications.map(item => ({
                    medicine: item.medication.id,
                    quantity: item.quantity
                }))
            };

            await axios.post('https://www.farm-service-kg.com/orders/', orderData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            setModalVisible(false);
            setAlertMessage('Успешно отправлено');
            setSelectedMedications([]);
        } catch (error) {
            console.error('Error sending order:', error);
            setAlertMessage('Ошибка');
            if (error.response && error.response.status === 401) {
                try {
                    await dispatch(refreshAccessToken());
                } catch (refreshError) {
                    console.error('Error refreshing access token:', refreshError);
                }
            }
        }
    };

    const isOrderValid = selectedMedications.length > 0;

    return (
        <div className="container mx-auto my-10 px-5">
            <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Заполните форму
            </h1>
            <div className="flex min-h-full  flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Выберите лекарство
                            </label>
                            <div className="mt-2">
                                <select className='x className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"' value={selectedMedication ? selectedMedication.id : ''} onChange={(e) => setSelectedMedication(medications.find(med => med.id === parseInt(e.target.value, 10)))}>
                                    <option value="">наименование лекарства</option>
                                    {medications.map(med => (
                                        <option key={med.id} value={med.id}>{med.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Выберите количество
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                                />

                            </div>
                        </div>



                        <button
                            type="button"
                            onClick={handleAddMedication}
                            className="rounded-md bg-lime-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
                        >
                            Добавить лекарство
                        </button>
                    </form>

                    <div className='mt-10'>
                        <h2 className='text-center text-lg font-bold leading-9 tracking-tight text-gray-900'>Выбранные лекарства</h2>
                        <ul>
                            {selectedMedications.map((item, index) => (
                                <li key={index}>{item.medication.name} - количество: {item.quantity}</li>
                            ))}
                        </ul>

                        {isOrderValid && (
                            <button
                                className="mt-5 rounded-md bg-lime-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
                                type="button" onClick={() => setModalVisible(true)}>
                                Отправить заказ
                            </button>
                        )}


                    </div>


                    {modalVisible && (
                        <div className="modal mt-10">
                            <h2 className='text-center text-lg font-bold leading-9 tracking-tight text-gray-900'>Подвердить заказ</h2>
                            <ul>
                                {selectedMedications.map((item, index) => (
                                    <li key={index}>{item.medication.name} - количество: {item.quantity}</li>
                                ))}
                            </ul>
                            <button type="button" onClick={handleSendOrder} className="mt-5 rounded-md bg-lime-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
                            >Подвердить</button>

                            <button type="button" className="mt-5 ml-5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
                                onClick={() => setModalVisible(false)}>отменить</button>


                        </div>

                    )}

                    {alertMessage && (
                        <div className={`alert mt-10 text-white p-5 text-center ${alertMessage === 'Успешно отправлено' ? 'bg-lime-500' : 'bg-red-600'}`}>
                            {alertMessage}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default MedicationForm;
