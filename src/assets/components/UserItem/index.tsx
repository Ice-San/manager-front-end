import { IconsContainer } from "../IconContainer";

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
                <IconsContainer imgSize="dashboard-list-item-icon" imgUrl='dashboard-list-item-container' />

                <div className="dashboard-list-item-info">
                    <div className="dashboard-list-item-top">
                        <h2>{username}</h2>
                        <p>{role}</p>
                        <p>{state}</p>
                    </div>

                    <p>{email}</p>
                    <p>Joined: {joined}</p>
                </div>

                <div className="dashboard-list-item-delete">
                    <IconsContainer imgSize="dashboard-list-item-delete-icon" imgUrl="dashboard-list-item-delete-container" />
                </div>
            </div>
        </>
    )
}