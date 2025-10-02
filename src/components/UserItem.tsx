import { Icon } from "./Icon";

import { getInitials } from "@utils/getInitials";
import { formatDate } from "@utils/formatDate";

type UserItemsType = {
    username: string,
    user_type: string,
    status: string,
    email: string,
    account_created_at: string,
    onDelete: (email: string) => void
}

export const UserItems = ({username, user_type, status, email, account_created_at, onDelete}: UserItemsType) => {
    if(!username || !user_type || !status || !email || !account_created_at) {
        return;
    }

    return (
        <>
            <div className="dashboard-list-item">
                <div className="dashboard-list-item-top">
                    <span>
                        <span>{getInitials(username.toCapitalize())}</span>
                    </span>

                    <div className="dashboard-list-item-info">
                        <div className="dashboard-list-item-bottom">
                            <h2>{username}</h2>
                            <p data-role={user_type.toCapitalize()}>{user_type.toCapitalize()}</p>
                            <p data-state={status.toCapitalize()}>{status.toCapitalize()}</p>
                        </div>

                        <p>{email}</p>
                        <p>Joined: {formatDate(account_created_at)}</p>
                    </div>
                </div>

                <button className="dashboard-list-item-delete" onClick={() => onDelete(email)}>
                    <Icon className="dashboard-list-item-delete-icon" url="/img/delete.png" />
                </button>
            </div>
        </>
    )
}