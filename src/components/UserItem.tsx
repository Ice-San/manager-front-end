import { Icon } from "./Icon";
import { getInitials } from "@utils/getInitials";

import deleteIcon from '@assets/img/delete.png';

type UserItemsType = {
    username: string,
    role: string,
    state: string,
    email: string,
    joined: string
}

export const UserItems = ({username, role, state, email, joined}: UserItemsType) => {
    return (
        <>
            <div className="dashboard-list-item">
                <div className="dashboard-list-item-top">
                    <span>
                        <span>{getInitials(username)}</span>
                    </span>

                    <div className="dashboard-list-item-info">
                        <div className="dashboard-list-item-bottom">
                            <h2>{username}</h2>
                            <p data-role={role}>{role}</p>
                            <p data-state={state}>{state}</p>
                        </div>

                        <p>{email}</p>
                        <p>Joined: {joined}</p>
                    </div>
                </div>

                <button className="dashboard-list-item-delete">
                    <Icon className="dashboard-list-item-delete-icon" url={deleteIcon} />
                </button>
            </div>
        </>
    )
}