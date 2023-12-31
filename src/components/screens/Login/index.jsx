import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginAsync } from '../../../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const dispatch = useDispatch();
    const loginStatus = useSelector((state) => state.auth.status);


    const { handleSubmit, register } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        dispatch(loginAsync(data));
    };

    useEffect(() => {
        if (loginStatus === 'succeeded') {
            navigate('/medForm');
            window.location.reload();
        }
    }, [loginStatus, navigate]);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Войдите в свой аккаунт
                    </h2>
                    <span className="mt-10 text-center text-base  font-normal leading-9 tracking-tight text-gray-900">
                        С возвращением! Пожалуйста, введите свои данные
                    </span>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Почта
                            </label>
                            <div className="mt-2">
                                <input
                                    autoComplete="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                    })}

                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Пароль
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    {...register('password', { required: 'Password is required' })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-lime-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
                            >
                                Войти
                            </button>
                        </div>
                    </form>

                    <div>
                        {loginStatus === 'succeeded' ? (
                            <Link to="/medForm">
                                <button className="mt-10 w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
                                    Перейти на главную страницу
                                </button>
                            </Link>
                        ) : loginStatus === 'failed' && (
                            <button className="mt-10 w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                                Ошибка, пользователя не существует либо введены некорректные данные
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
