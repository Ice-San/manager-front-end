import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router";
import { validation } from "@utils/validation";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

import { Icon } from "@components/Icon";
import { SelectLanguage } from "@components/SelectLanguage";
import { Stats } from "./components/Stats";
import { List } from "./components/List";

import '@styles/index.css';
import './styles/index.css';
import './styles/media-querys.css';

import usersData from '@data/users.json';
import statsData from '@data/stats';

import { User } from "types/user";

type Form = {
    username: string,
    email: string,
    role: string
}

const { VITE_API_ENDPOINT } = import.meta.env;

export const DashboardPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Form>();
    const navegate = useNavigate();
    const [cookies, _, removeCookie] = useCookies(['token']);
    const { t } = useTranslation("dashboard");

    const [ users, setUsers ] = useState<User[]>(usersData);
    const [ stats, setStats ] = useState(statsData);

    const handleAdd = async ({username, role, email}: Form) => {
        if (users.find(user => user.email === email)) {
            toast.warning("A user with that email already exists!", {
                position: "top-left",
                pauseOnHover: false,
                draggable: 'touch'
            });
            return;
        }

        try {
            const token = cookies?.token;
            const response = await fetch(`${VITE_API_ENDPOINT}/users/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({token, username, email, role})
            });
            const { data, status } = await response.json();
            const { success } = data;

            if(status !== 201 || !success) {
                console.error("User Creation was failed...");
                toast.error('User Creation was failed...', {
                    position: "top-left",
                    pauseOnHover: false,
                    draggable: 'touch'
                });
                return;
            }

            const date = new Date();
            const id = (users.at(-1)?.id || 0) + 1;
            const user = {
                id,
                username,
                email,
                role,
                state: "active",
                joined: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
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

    const handleSignOut = () => {
        removeCookie("token");
    }

    useEffect(() => {
        const token = cookies?.token;

        (async () => {
            const auth = await validation(token as string);
            if(!auth) navegate('/');
        })();
    },[]);

    useEffect(() => {
        setStats({
            totalUsers: users.length,
            admins: users.filter(user => user.role === "admin").length,
            moderators: users.filter(user => user.role === "moderator").length,
            users: users.filter(user => user.role === "user").length
        });
    }, [users])

    return (
        <div className="dashboard">
            <div className="dashboard-title">
                <div className="dashboard-title-content">
                    <h1>{t("title")}</h1>
                    <p>{t("subtitle")}</p>
                </div>

                <div className="dashboard-right-content">
                    <SelectLanguage />

                    <Link to="/" className="logout" onClick={() => handleSignOut()}>
                        <Icon className="logout-icon" url="/img/logout.png" />
                        <p>{t("logout")}</p>
                    </Link>
                </div>
            </div>

            <div className="dashboard-users">
                <div className="dashboard-add">
                    <div className="dashboard-add-title">
                        <div className="dashboard-add-title-top">
                            <Icon className="dashboard-add-icon" url="/img/add-user-black.png" />
                            <h2>{t("adduser.title")}</h2>
                        </div>

                        <div className="dashboard-add-title-bottom">
                            {t("adduser.subtitle")}
                        </div>
                    </div>

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
                </div>

                <List users={users} setUsers={setUsers} stats={stats} />
            </div>

            <div className="dashboard-stats">
                <Stats 
                    icon='dashboard-total-icon'
                    title={ t("totalusers") }
                    value={stats.totalUsers}
                />
                <Stats 
                    icon=''
                    title={ t("admins") }
                    value={stats.admins}
                />
                <Stats 
                    icon=''
                    title={ t("moderators") }
                    value={stats.moderators}
                />
                <Stats 
                    icon=''
                    title={ t("users") }
                    value={stats.users}
                />
            </div>

            <ToastContainer />
        </div>
    )
};