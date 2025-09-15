import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

import { Icon } from "@components/Icon";
import { UserItems } from "@components/UserItem";

import { match } from "@utils/match";

import { User } from "types/user";

type List = {
    users: any[],
    setUsers: Dispatch<SetStateAction<User[]>>,
    stats: any,
}

export const List = ({ users, setUsers, stats }: List) => {
    const [ input, setInput ] = useState('');
    const { t } = useTranslation("dashboard");

    const handleDelete = (email: string) => {
        setUsers(prevUser => prevUser.filter(user => user.email !== email));
    }

    return (
        <>
            <div className="dashboard-list">
                <div className="dashboard-list-title">
                    <div className="dashboard-list-title-top">
                        <Icon className="dashboard-list-icon" url='/img/user-list-black.png' />
                        <h2>{ t("userlistTitle") } ({stats.totalUsers})</h2>
                    </div>
                
                    <div className="dashboard-list-title-bottom">
                        { t("userlistSubtitle") }
                    </div>
                </div>

                <div className="dashboard-list-content">
                    <div className="dashboard-list-searchbar">
                        <Icon className="dashboard-list-searchbar-icon" url="/img/search-icon.png" />
                        <input
                            onChange={e => setInput(e.target.value)}
                            type="text" 
                            placeholder={ t("searchPlaceholder") }
                        />
                    </div>

                    <div className="dashboard-list-users">
                        {users.filter(user => match(user.username, input)).map(user => (
                            <UserItems
                                key={user.id}
                                {...user}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}