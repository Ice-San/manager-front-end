import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import './styles/index.css';
import './styles/media-querys.css';

import { IconsContainer } from '@assets/components/img-container';
import { useEffect } from 'react';

type FormData = {
    email: string,
    password: string
};

export const SignInPage = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const navegate = useNavigate();

    const onSubmit = handleSubmit(async dataForm => { 
        try {
            const response = await fetch('http://localhost:5005/auth', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataForm)
            });
            const { data, status } = await response.json();
            const { success, userId } = data;
    
            if(status !== 200 || success !== true) {
                console.error("Authentication was a failed...");
                return;
            }

            if(!userId) {
                console.error("User not exist!");
                return;
            }
            
            localStorage.setItem("userId", userId);
            navegate("/account");
        } catch (err) {
            console.error("Something went wrong: ", err);
        }
    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if(userId) {
            navegate('/account');
        }
    }, []);

    return (
        <div className="background">
            <div className="background-container divs-container">
                <div className="overlay">
                    <div className="auth-box">
                        <IconsContainer imgSize="logo-size" imgUrl="logo-img" />

                        <form onSubmit={onSubmit}>
                            <div className="label">
                                <IconsContainer imgSize="icons-size" imgUrl="email-icon" />
                                <p>Email</p>
                            </div>

                            <input {...register('email', { required: 'It seems you dont\' put an email :( ', pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, maxLength: 100 })} className='inputs' type="email" placeholder='userTest@gmail.com' />

                            <div className="label">
                                <IconsContainer imgSize="icons-size" imgUrl="password-icon" />
                                <p>Password</p>
                            </div>
                            <input {...register('password', { required: 'It seems you dont\' put an password', maxLength: 100 })} className='inputs' type="password" placeholder='****' />

                            <div className="submit-btn">
                                <input type="submit" value="Sign In" />
                                <p>Don't have a account? <Link to="/">SignUp!</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}