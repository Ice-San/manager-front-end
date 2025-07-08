import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import './index.css';

import { useEffect } from 'react';

const { VITE_API_ENDPOINT } = import.meta.env;

type FormData = {
    email: string,
    password: string
};

export const SignInPage = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const navegate = useNavigate();

    const onSubmit = handleSubmit(async dataForm => { 
        try {
            const response = await fetch(`${VITE_API_ENDPOINT}/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataForm)
            });
            const { data, status } = await response.json();
            const { success, token } = data;
    
            if(status !== 200 || success !== true) {
                console.error("Authentication was a failed...");
                return;
            }

            if(!token) {
                console.error("User not exist!");
                return;
            }
            
            document.cookie = `token=${token};`;
            navegate("/account");
        } catch (err) {
            console.error("Something went wrong: ", err);
        }
    });

    useEffect(() => {
        const decodedToken = decodeURIComponent(document.cookie);
        const token = decodedToken.substring(6).split(";")[0];

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

                <form onSubmit={onSubmit}>
                    <div className="inputs-spacing">
                        <div className="input">
                            <div className="label">
                                <h2>Email</h2>
                            </div>
                            <input {...register('email', { required: 'It seems you dont\' put an email :( ', pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, maxLength: 100 })} className='inputs' type="email" placeholder='m@example.com' />
                        </div>

                        <div className="input">
                            <div className="label">
                                <h2>Password</h2>
                            </div>
                            <input {...register('password', { required: 'It seems you dont\' put an password', maxLength: 100 })} className='inputs' type="password" placeholder='' />
                        </div>
                    </div>

                    <div className="submit-btn">
                        <input type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    );
}