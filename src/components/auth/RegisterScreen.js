import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator'
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui);


    console.log(msgError);

    const [formValues, handleInputChange] = useForm({
        name: 'Nahuel',
        email: 'nando@gmail.com',
        password: '123456666',
        confirm: '123456666'
    });

    const { name, email, password, confirm } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch(setError('Se requiere el nombre'))
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('El email no es valido'))
            return false;
        } else if (password !== confirm || password.length < 5) {
            dispatch(setError('Password es menor a 5 caracteres, o no coinciden'))
            return false;
        }

        dispatch(removeError())
        return true;
    }



    return (
        <div>
            <h3 className='auth__title'>Registración</h3>

            <form 
                onSubmit={handleRegister}
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError &&
                    (
                        <div className='auth__alert-error'>
                            { msgError }
                        </div>
                    )
                }

                <input
                    type="name"
                    placeholder='Name'
                    name='name'
                    className='auth__input'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder='Confirm password'
                    name='confirm'
                    className='auth__input'
                    value={confirm}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Registrarse
                </button>

                <Link
                    to="/auth/login"
                    className="link"
                >
                    Ya estas registrado?
                </Link>

            </form >
        </div >
    )
}