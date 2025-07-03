import { useEffect } from "react";
import { useNavigate } from "react-router";

export const DashboardPage = () => {
    const navegate = useNavigate();
    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if(!userId) {
            navegate('/');
        }
    },[]);

    return (
        <h1>Hello User!</h1>
    )
};