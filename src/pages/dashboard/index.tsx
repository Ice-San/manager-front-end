import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router";
import { validation } from "@utils/validation";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

import { Icon } from "@components/Icon";
import { SelectLanguage } from "@components/SelectLanguage";
import { AddUser } from "./components/AddUser";
import { Stats } from "./components/Stats";
import { List } from "./components/List";

import '@styles/index.css';
import './styles/index.css';
import './styles/media-querys.css';

import statsData from '@data/stats';

import { User } from "types/user";

const { VITE_API_ENDPOINT } = import.meta.env;

export const DashboardPage = () => {
    const navegate = useNavigate();
    const [cookies, _, removeCookie] = useCookies(['token']);
    const { t } = useTranslation("dashboard");

    const [ users, setUsers ] = useState<User[]>([]);
    const [ stats, setStats ] = useState(statsData);

    const handleSignOut = () => {
        removeCookie("token");
    }
    
    const token = cookies?.token;
    
    useEffect(() => {
        (async () => {
            const auth = await validation(token as string);
            if(!auth) navegate('/');
        })();
    },[]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${VITE_API_ENDPOINT}/users?max=3`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const { data, status } = await response.json();

            if (status !== 200) {
                console.error("Users not found!");
                toast.error('Users not found!', {
                    position: "top-left",
                    pauseOnHover: false,
                    draggable: 'touch'
                });
                return;
            }

            setUsers(data);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${VITE_API_ENDPOINT}/kpi/active`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const { data, status } = await response.json();
            const { total, admins, moderators, users } = data;

            if (status !== 200) {
                console.error("KPIs not found!");
                toast.error('KPIs not found!', {
                    position: "top-left",
                    pauseOnHover: false,
                    draggable: 'touch'
                });
                return;
            }

            setStats({
                total,
                admins,
                moderators,
                users
            });
        })();
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

                    <AddUser setUsers={setUsers} />
                </div>

                <List users={users} setUsers={setUsers} stats={stats} setStats={setStats} />
            </div>

            <div className="dashboard-stats">
                <Stats 
                    icon='dashboard-total-icon'
                    title={ t("totalusers") }
                    value={stats.total}
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