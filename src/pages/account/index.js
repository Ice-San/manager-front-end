import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router";
export const AccountPage = () => {
    const navegate = useNavigate();
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navegate('/signin');
        }
    }, []);
    return (_jsx("h1", { children: "Hello User!" }));
};
