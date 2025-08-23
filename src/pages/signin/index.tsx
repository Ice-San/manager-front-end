import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import './index.css';

const { VITE_API_ENDPOINT } = import.meta.env;

type FormData = {
    email: string,
    password: string
};

export const SignInPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const navegate = useNavigate();

    const [cookies, setCookie] = useCookies(['token']);

    const onSubmit = async (dataForm: FormData) => {
        try {
            const response = await fetch(`${VITE_API_ENDPOINT}/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataForm)
            })
            const { data, status } = await response.json();
            const { success, token } = data;
    
            if(status !== 200 || success !== true) {
                console.error("Authentication was a failed...");
                toast.error('Authentication was a failed...', {
                    position: "bottom-right",
                    pauseOnHover: false,
                    draggable: 'touch'
                });
                return;
            }

            if(!token) {
                console.warn("User not exist!");
                toast.warning('User not exist!', {
                    position: "bottom-right",
                    pauseOnHover: false,
                    draggable: 'touch'
                });
                return;
            }

            toast.success('Your Login was a success!', {
                position: "bottom-right",
                pauseOnHover: false,
                draggable: 'touch'
            });
            
            setCookie('token', token);
            navegate("/account");
        } catch (err) {
            console.error("Something went wrong: ", err);
        }
    };

    function onError(err: any) {
        Object.values(err).map((err: any) => {
            toast.warning(err.message, {
                position: "bottom-right",
                pauseOnHover: false,
                draggable: 'touch'
            });
            return;
        });
    }

    useEffect(() => {
        const token = cookies?.token;

        if(token) {
            navegate('/account');
        }
    }, []);

    return (
        <div className="background">
            <div className="auth-box">
                <div className="auth-box-title">
                    <h1>Login to your account</h1>
                    <p>Enter your email below to login to your account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="inputs-spacing">
                        <div className="input">
                            <div className="label">
                                <h2>Email</h2>
                            </div>
                            <input 
                                {...register('email', { 
                                    required: 'It seems you don\'t put an email', 
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 
                                        message: "The email isn't valid!"
                                    },
                                    maxLength: {
                                        value: 100, 
                                        message: "You can only write 100 characters on email input!"
                                    } 
                                })} 
                                className='inputs' 
                                type="email" 
                                placeholder='m@example.com' 
                            />
                        </div>

                        <div className="input">
                            <div className="label">
                                <h2>Password</h2>
                            </div>
                            <input 
                                {...register('password', { 
                                    required: 'It seems you don\'t put an password', 
                                    maxLength: {
                                        value: 100, 
                                        message: "You can only write 100 characters on email input!"
                                    } 
                                })}
                                className='inputs' 
                                type="password" 
                                placeholder='' 
                            />
                        </div>
                    </div>

                    <div className="submit-btn">
                        <input type="submit" value="Login" />
                    </div>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
}