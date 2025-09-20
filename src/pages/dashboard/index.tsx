import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
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

export const DashboardPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Form>();
    const navegate = useNavigate();
    const [cookies] = useCookies(['token']);
    const { t } = useTranslation("dashboard");

    const [ users, setUsers ] = useState<User[]>(usersData);
    const [ stats, setStats ] = useState(statsData);

    const handleAdd = ({username, role, email}: Form) => {
        if (users.find(user => user.email === email)) {
            toast.warning("A user with that email already exists!", {
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
            role: role.toLowerCase(),
            state: "active",
            email,
            joined: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        }

        setUsers(prev => [...prev, user]);
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

                <div>
                    <SelectLanguage />
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
                                    <option>{t("role.user")}</option>
                                    <option>{t("role.moderator")}</option>
                                    <option>{t("role.admin")}</option>
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