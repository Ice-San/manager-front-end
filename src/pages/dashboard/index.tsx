import { useEffect } from "react";
import { useNavigate } from "react-router";
import { validation } from "helpers/validation";

export const DashboardPage = () => {
    const navegate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        (async () => {
            const auth = await validation(token as string);
            if(!auth) navegate('/');
        })();
    },[]);

    return (
        <h1>Hello User!</h1>
    )
};