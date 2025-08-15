import { Icon } from "./Icon";
import { getInitials } from "@utils/getInitials";

type UserItemsType = {
    username: string,
    role: string,
    state: string,
    email: string,
    joined: string,
    onDelete: (email: string) => void
}

export const UserItems = ({username, role, state, email, joined, onDelete}: UserItemsType) => {
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
                            <p data-role={role.toCapitalize()}>{role.toCapitalize()}</p>
                            <p data-state={state.toCapitalize()}>{state.toCapitalize()}</p>
                        </div>

                        <p>{email}</p>
                        <p>Joined: {joined}</p>
                    </div>
                </div>

                <button className="dashboard-list-item-delete" onClick={() => onDelete(email)}>
                    <Icon className="dashboard-list-item-delete-icon" url="/img/delete.png" />
                </button>
            </div>
        </>
    )
}