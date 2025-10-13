import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { Icon } from "@components/Icon";
import { UserItems } from "@components/UserItem";

import { match } from "@utils/match";

import { User } from "types/user";

const { VITE_API_ENDPOINT } = import.meta.env;

type List = {
    users: any[],
    setUsers: Dispatch<SetStateAction<User[]>>,
    stats: any,
}

export const List = ({ users, setUsers, stats }: List) => {
    const [ input, setInput ] = useState('');
    const [cookies] = useCookies(['token']);
    const { t } = useTranslation("dashboard");

    const handleDelete = async (email: string) => {
        try {
            const token = cookies?.token;
            const response = await fetch(`${VITE_API_ENDPOINT}/users/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({email})
            });
            const { status } = await response.json();

            if(status !== 200) {
                console.error("User Reactivation was failed...");
                toast.error('User Reactivation was failed...', {
                    position: "top-left",
                    pauseOnHover: false,
                    draggable: 'touch'
                });
                return;
            }
        } catch (err) {
            console.error("Something went wrong: ", err);
        }

        setUsers(prevUser => prevUser.filter(user => user.email !== email));
    }

    return (
        <>
            <div className="dashboard-list">
                <div className="dashboard-list-title">
                    <div className="dashboard-list-title-top">
                        <Icon className="dashboard-list-icon" url='/img/user-list-black.png' />
                        <h2>{t("userlist.title")} ({stats.totalUsers})</h2>
                    </div>
                
                    <div className="dashboard-list-title-bottom">
                        { t("userlist.subtitle") }
                    </div>
                </div>

                <div className="dashboard-list-content">
                    <div className="dashboard-list-searchbar">
                        <Icon className="dashboard-list-searchbar-icon" url="/img/search-icon.png" />
                        <input
                            onChange={e => setInput(e.target.value)}
                            type="text" 
                            placeholder={ t("search.placeholder") }
                        />
                    </div>

                    <div className="dashboard-list-users">
                        {users
                            .filter(user => match(user.username, input))
                            .reverse()
                            .map(user => (
                                <div key={user.email} className="dashboard-list-user-parent">
                                    <Link className="dashboard-list-user" to='/profile'>
                                        <UserItems
                                            {...user}
                                        />
                                    </Link>

                                    <button className="dashboard-list-item-delete" onClick={() => handleDelete(user.email)}>
                                        <Icon className="dashboard-list-item-delete-icon" url="/img/delete.png" />
                                    </button>
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}