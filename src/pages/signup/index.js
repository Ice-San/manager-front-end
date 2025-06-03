import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import './styles/index.css';
import './styles/media-querys.css';
import { IconsContainer } from '@assets/components/img-container';
export const SignUpPage = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = handleSubmit(async (dataForm) => {
        try {
            const response = await fetch('http://localhost:5005/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataForm)
            });
            const { data, status } = await response.json();
            const { success, userId } = data;
            if (status !== 201 || success !== true) {
                console.error("SignUp was failed...");
                return;
            }
            if (!userId) {
                console.error("User not exist!");
                return;
            }
            localStorage.setItem("userId", userId);
            navigate('/signin');
        }
        catch (err) {
            console.error("Something went wrong: ", err);
        }
    });
    return (_jsx("div", { className: "background", children: _jsx("div", { className: "background-container divs-container", children: _jsx("div", { className: "overlay", children: _jsxs("div", { className: "auth-box", children: [_jsx(IconsContainer, { imgSize: "logo-size", imgUrl: "logo-img" }), _jsxs("form", { onSubmit: onSubmit, children: [_jsxs("div", { className: "label", children: [_jsx(IconsContainer, { imgSize: "icons-size", imgUrl: "email-icon" }), _jsx("p", { children: "Email" })] }), _jsx("input", { ...register('email', { required: 'It seems you dont\' put an email :( ', pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, maxLength: 100 }), className: 'inputs', type: "email", placeholder: 'userTest@gmail.com' }), _jsxs("div", { className: "label", children: [_jsx(IconsContainer, { imgSize: "icons-size", imgUrl: "username-icon" }), _jsx("p", { children: "Username" })] }), _jsx("input", { ...register('username', { required: 'It seems you dont\' put an username...', maxLength: 50 }), className: 'inputs', type: "text", placeholder: 'rainbow350' }), _jsxs("div", { className: "label", children: [_jsx(IconsContainer, { imgSize: "icons-size", imgUrl: "password-icon" }), _jsx("p", { children: "Password" })] }), _jsx("input", { ...register('password', { required: 'It seems you dont\' put an password', maxLength: 100 }), className: 'inputs', type: "password", placeholder: '****' }), _jsxs("div", { className: "label", children: [_jsx(IconsContainer, { imgSize: "icons-size", imgUrl: "password-icon" }), _jsx("p", { children: "Confirm Password" })] }), _jsx("input", { ...register('confirmPassword', { required: 'It seems you dont\' confirm password', maxLength: 100 }), className: 'inputs', type: "password", placeholder: '****' }), _jsxs("div", { className: "submit-btn", children: [_jsx("input", { type: "submit", value: "Sign Up" }), _jsxs("p", { children: ["Have a account? ", _jsx(Link, { to: "/signin", children: "SignIn!" })] })] })] })] }) }) }) }));
};
