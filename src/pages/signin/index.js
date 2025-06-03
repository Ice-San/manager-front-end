import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import './styles/index.css';
import './styles/media-querys.css';
import { IconsContainer } from '@assets/components/img-container';
import { useEffect } from 'react';
export const SignInPage = () => {
    const { register, handleSubmit } = useForm();
    const navegate = useNavigate();
    const onSubmit = handleSubmit(async (dataForm) => {
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
            if (status !== 200 || success !== true) {
                console.error("Authentication was a failed...");
                return;
            }
            if (!userId) {
                console.error("User not exist!");
                return;
            }
            localStorage.setItem("userId", userId);
            navegate("/account");
        }
        catch (err) {
            console.error("Something went wrong: ", err);
        }
    });
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            navegate('/account');
        }
    }, []);
    return (_jsx("div", { className: "background", children: _jsx("div", { className: "background-container divs-container", children: _jsx("div", { className: "overlay", children: _jsxs("div", { className: "auth-box", children: [_jsx(IconsContainer, { imgSize: "logo-size", imgUrl: "logo-img" }), _jsxs("form", { onSubmit: onSubmit, children: [_jsxs("div", { className: "label", children: [_jsx(IconsContainer, { imgSize: "icons-size", imgUrl: "email-icon" }), _jsx("p", { children: "Email" })] }), _jsx("input", { ...register('email', { required: 'It seems you dont\' put an email :( ', pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, maxLength: 100 }), className: 'inputs', type: "email", placeholder: 'userTest@gmail.com' }), _jsxs("div", { className: "label", children: [_jsx(IconsContainer, { imgSize: "icons-size", imgUrl: "password-icon" }), _jsx("p", { children: "Password" })] }), _jsx("input", { ...register('password', { required: 'It seems you dont\' put an password', maxLength: 100 }), className: 'inputs', type: "password", placeholder: '****' }), _jsxs("div", { className: "submit-btn", children: [_jsx("input", { type: "submit", value: "Sign In" }), _jsxs("p", { children: ["Don't have a account? ", _jsx(Link, { to: "/", children: "SignUp!" })] })] })] })] }) }) }) }));
};
