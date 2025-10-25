import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { Icon } from '@components/Icon';

import { User } from "types/user";

import { getTodayDate } from "@utils/getTodayDate";

const { VITE_API_ENDPOINT } = import.meta.env;

type AddUserType = {
    setUsers: Dispatch<SetStateAction<User[]>>
}

type Form = {
    username: string,
    email: string,
    role: string
}

type ReactivateUserType = {
    email: string
}

export const AddUser = ({ setUsers }: AddUserType) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Form>();
    const [cookies] = useCookies(['token']);
    const { t } = useTranslation("dashboard");

    const handleAdd = async ({username, role, email}: Form) => {
        try {
            const token = cookies?.token;
            const response = await fetch(`${VITE_API_ENDPOINT}/users/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({username, email, role})
            });
            const { data, status } = await response.json();
            const { success } = data;

            if(status === 409) {
                if(confirm("User Already exists! Do you wanna reactivate that user account?")) {
                    handleReactivateUser({email});
                }
                return;
            }

            if(status !== 201 || !success) {
                console.error("User Creation was failed...");
                toast.error('User Creation was failed...', {
                    position: "top-left",
                    pauseOnHover: false,
                    draggable: 'touch'
                });
                return;
            }

            const user = {
                username,
                email,
                user_type: role,
                status: "active",
                account_created_at: getTodayDate()
            }

            setUsers(prev => [...prev, user]);

            toast.success(`User ${username} was created!`, {
                position: "top-left",
                pauseOnHover: false,
                draggable: 'touch'
            });
        } catch(err) {
            console.error("Something went wrong: ", err);
        }
    }

    const handleReactivateUser = async ({email}: ReactivateUserType) => {
        try {
            const token = cookies?.token;
            const response = await fetch(`${VITE_API_ENDPOINT}/users/reactivate/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({email})
            });
            const { status, data } = await response.json();
            const { username, user_type, joined } = data;

            if(status !== 200) {
                console.error("User Reactivation was failed...");
                toast.error('User Reactivation was failed...', {
                    position: "top-left",
                    pauseOnHover: false,
                    draggable: 'touch'
                });
                return;
            }

            const user = {
                username,
                email,
                user_type,
                status: "active",
                account_created_at: getTodayDate()
            }

            setUsers(prev => [...prev, user]);

            toast.success(`User ${username} was reactivated!`, {
                position: "top-left",
                pauseOnHover: false,
                draggable: 'touch'
            });
        } catch (err) {
            console.error("Something went wrong: ", err);
        }
    }

    const handleError = (err: any) => {
        Object.values(err).map((err: any) => {
            toast.warning(err.message, {
                position: "top-left",
                pauseOnHover: false,
                draggable: 'touch'
            });
            return;
        });
    }

    return (
        <div className="dashboard-add-form">
            <form onSubmit={handleSubmit(handleAdd, handleError)}>
                <div className="dashboard-add-form-inputs">
                    <label> {t("fullname.title")} </label>
                    <input 
                        {...register('username', {
                            required: t("fullname.required")
                        })}
                        type="text" 
                        placeholder={t("fullname.placeholder")}
                    />
                </div>

                <div className="dashboard-add-form-inputs">
                    <label>{t("email.title")}</label>
                    <input
                        {...register('email', { 
                            required: t("email.required"), 
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 
                                message: t("email.pattern")
                            },
                            maxLength: {
                                value: 100, 
                                message: t("email.maxlength")
                            } 
                        })} 
                        type="text" 
                        placeholder={t("email.placeholder")}
                    />
                </div>

                <div className="dashboard-add-form-inputs">
                    <label>{ t("role.title") }</label>
                    <select {...register('role')}>
                        <option value='user'>{t("role.user")}</option>
                        <option value='moderator'>{t("role.moderator")}</option>
                        <option value='admin'>{t("role.admin")}</option>
                    </select>
                </div>

                <button className="dashboard-add-btn" type="submit">
                    <Icon className="dashboard-add-icon-btn" url='/img/add-user-white.png' />
                    {t("button.title")}
                </button>
            </form>
        </div>
    );
}