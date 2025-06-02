import { useEffect } from "react";
import { useNavigate } from "react-router";

export const AccountPage = () => {
    const navegate = useNavigate();
    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if(!userId) {
            navegate('/signin');
        }
    },[]);

    return (
        <h1>Hello User!</h1>
    )
};