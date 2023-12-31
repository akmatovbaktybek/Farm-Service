import React, { useState } from 'react'; // Удалены неиспользуемые импорты
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; // Удален неиспользуемый импорт useSelector
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

import { refreshAccessToken, logout } from '../../../store/slices/authSlice';

const MedicationForm = () => {
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedMedications, setSelectedMedications] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(state => state.auth.accessToken);

    const loadOptions = (inputValue, callback) => {
        axios.get(`https://www.farm-service-kg.com/application/?search=${inputValue}`)
            .then(response => {
                const options = response.data.map(med => ({
                    value: med.id,
                    label: med.name,
                }));
                callback(options);
            })
            .catch(error => {
                console.error('Error fetching medications:', error);
                callback([]);
            });
    };

    const handleAddCustomMedication = () => {
        if (selectedMedication && quantity > 0) {
            const existingItemIndex = selectedMedications.findIndex(item => item.medication.value === selectedMedication.value);
            if (existingItemIndex !== -1) {
                const updatedMedications = [...selectedMedications];
                updatedMedications[existingItemIndex].quantity += quantity;
                setSelectedMedications(updatedMedications);
            } else {
                setSelectedMedications([...selectedMedications, { medication: selectedMedication, quantity }]);
            }

            setSelectedMedication(null);
            setQuantity(1);
        }
    };

    const handleIncreaseQuantity = (medication) => {
        const updatedMedications = selectedMedications.map(item => {
            if (item.medication.value === medication.value) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });
        setSelectedMedications(updatedMedications);
    };

    const handleDecreaseQuantity = (medication) => {
        const updatedMedications = selectedMedications.map(item => {
            if (item.medication.value === medication.value && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }
            return item;
        });
        setSelectedMedications(updatedMedications);
    };

    const handleSendOrder = async () => {
        try {
            const orderData = {
                items: selectedMedications.map(item => ({
                    medicine: item.medication.value,
                    quantity: item.quantity
                }))
            };

            // Ваш запрос на сервер
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

    const handleRemoveMedication = (medication) => {
        const updatedMedications = selectedMedications.filter(item => item.medication.value !== medication.value);
        setSelectedMedications(updatedMedications);
    };

    const handleLogout = async () => {
        try {
            // Ваш код для выхода из системы
            await dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
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
                                <AsyncSelect
                                    cacheOptions
                                    loadOptions={loadOptions}
                                    defaultOptions
                                    value={selectedMedication}
                                    onChange={value => setSelectedMedication(value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Выберите количество
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-gray-300 focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddCustomMedication}
                            className="rounded-md bg-lime-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus:ring-lime-500 focus:border-lime-500"
                        >
                            Добавить лекарство с количеством
                        </button>
                    </form>

                    <div className="mt-10">
                        <h2 className="text-center text-lg font-bold leading-9 tracking-tight text-gray-900">Выбранные лекарства</h2>
                        <ul>
                            {selectedMedications.map(item => (
                                <li key={item.medication.value} className="gap-x-6 py-5 px-2 border rounded-md mt-2">
                                    <div className="flex items-center justify-between  min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm leading-6 text-gray-900">{item.medication.label} - количество: {item.quantity}</p>
                                        </div>
                                        <div className="flex items-center  space-x-1">
                                            <button
                                                type="button"
                                                onClick={() => handleDecreaseQuantity(item.medication)}
                                                className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus:ring-gray-400 focus:border-gray-400"
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleIncreaseQuantity(item.medication)}
                                                className="rounded-md bg-lime-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-600 focus:ring-lime-500 focus:border-lime-500"
                                            >
                                                +
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveMedication(item.medication)}
                                                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:ring-red-500 focus:border-red-500"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {isOrderValid && (
                            <button
                                className="mt-5 rounded-md bg-lime-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus:ring-lime-500 focus:border-lime-500"
                                type="button"
                                onClick={() => setModalVisible(true)}
                            >
                                Отправить заказ
                            </button>
                        )}
                    </div>

                    {modalVisible && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h2 className="text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
                                    Подтвердить заказ
                                </h2>
                                <ul className="mt-4">
                                    {selectedMedications.map((item, index) => (
                                        <li key={index} className="gap-x-6 py-5 px-2 border rounded-md mt-2">
                                            <div className="flex items-center justify-between  min-w-0 gap-x-4">
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm leading-6 text-gray-900">{item.medication.label} - количество: {item.quantity}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-end mt-6">
                                    <button
                                        className="mr-2 px-4 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600"
                                        onClick={handleSendOrder}
                                    >
                                        Подтвердить
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        onClick={() => setModalVisible(false)}
                                    >
                                        Отменить
                                    </button>
                                </div>
                                {alertMessage && (
                                    <div className={`alert mt-10 text-white p-5 text-center ${alertMessage === 'Успешно отправлено' ? 'bg-lime-500' : 'bg-red-600'}`}>
                                        {alertMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {alertMessage && (
                        <div className={`alert mt-10 text-white p-5 text-center ${alertMessage === 'Успешно отправлено' ? 'bg-lime-500' : 'bg-red-600'}`}>
                            {alertMessage}
                        </div>
                    )}

                    <button
                        className="mt-5 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus:ring-red-500 focus:border-red-500"
                        onClick={handleLogout}
                    >
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MedicationForm;