import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { validation } from "@utils/validation";

import { Icon } from "@components/Icon";
import { UserItems } from "@components/UserItem";
import { Stats } from "./components/Stats";

import '@styles/index.css';
import './styles/index.css';
import './styles/media-querys.css';

import users from '@data/users.json';
import stats from '@data/stats.json';

export const DashboardPage = () => {
    const navegate = useNavigate();
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        const token = cookies?.token;

        (async () => {
            const auth = await validation(token as string);
            if(!auth) navegate('/');
        })();
    },[]);

    return (
        <div className="dashboard">
            <div className="dashboard-title">
                <h1>Manager</h1>
                <p>Manage your users efficiently with add, remove, and search functionality.</p>
            </div>

            <div className="dashboard-users">
                <div className="dashboard-add">
                    <div className="dashboard-add-title">
                        <div className="dashboard-add-title-top">
                            <Icon className="dashboard-add-icon" url="/img/add-user-black.png" />
                            <h2>Add New User</h2>
                        </div>

                        <div className="dashboard-add-title-bottom">
                            Fill in the details to add a new user to the system.
                        </div>
                    </div>

                    <div className="dashboard-add-form">
                        <form action="">
                            <div className="dashboard-add-form-inputs">
                                <label>Full Name</label>
                                <input type="text" placeholder="Enter full name" />
                            </div>

                            <div className="dashboard-add-form-inputs">
                                <label>Email Address</label>
                                <input type="text" placeholder="Enter email address" />
                            </div>

                            <div className="dashboard-add-form-inputs">
                                <label>Role</label>
                                <select>
                                    <option>User</option>
                                    <option>Moderator</option>
                                    <option>Admin</option>
                                </select>
                            </div>

                            <button className="dashboard-add-btn">
                                <Icon className="dashboard-add-icon-btn" url='/img/add-user-white.png' />
                                Add User
                            </button>
                        </form>
                    </div>
                </div>

                <div className="dashboard-list">
                    <div className="dashboard-list-title">
                        <div className="dashboard-list-title-top">
                            <Icon className="dashboard-list-icon" url='/img/user-list-black.png' />
                            <h2>User List (3)</h2>
                        </div>
                    
                        <div className="dashboard-list-title-bottom">
                            Search and manage existing users in the system.
                        </div>
                    </div>

                    <div className="dashboard-list-content">
                        <div className="dashboard-list-searchbar">
                            <Icon className="dashboard-list-searchbar-icon" url="/img/search-icon.png" />
                            <input type="text" placeholder="Search users by name, email or role..." />
                        </div>

                        <div className="dashboard-list-users">
                            {users.map((user, index) => (
                                <UserItems
                                    key={index}
                                    {...user}
                                    role={user.role.toCapitalize()}
                                    state={user.state.toCapitalize()}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-stats">
                <Stats 
                    icon='dashboard-total-icon'
                    title='Total Users'
                    value={stats.totalUsers}
                />
                <Stats 
                    icon=''
                    title='Admins'
                    value={stats.admins}
                />
                <Stats 
                    icon=''
                    title='Moderators'
                    value={stats.moderators}
                />
                <Stats 
                    icon=''
                    title='Users'
                    value={stats.users}
                />
            </div>
        </div>
    )
};