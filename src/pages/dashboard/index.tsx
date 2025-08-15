import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { validation } from "@utils/validation";
import { ToastContainer, toast } from 'react-toastify';

import { Icon } from "@components/Icon";
import { UserItems } from "@components/UserItem";
import { Stats } from "./components/Stats";

import '@styles/index.css';
import './styles/index.css';
import './styles/media-querys.css';

import users from '@data/users.json';
import stats from '@data/stats';

type AddUserForm = {
    username: string,
    email: string,
    role: string
}

export const DashboardPage = () => {
    const [ usersData, setUsersData ] = useState(users);
    const { register, handleSubmit, formState: { errors } } = useForm<AddUserForm>();
    const navegate = useNavigate();
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        const token = cookies?.token;

        (async () => {
            const auth = await validation(token as string);
            if(!auth) navegate('/');
        })();
    },[]);

    const handleAddUser = ({username, role, email}: AddUserForm) => {
        const date = new Date();
        const user = {
            username,
            role,
            state: "active",
            email,
            joined: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        }

        setUsersData(prev => [...prev, user])
    }

    const handleRemoveUser = (email: string) => {
        setUsersData(prevUser => prevUser.filter(user => user.email !== email));
    }

    const onUserAddError = (err: any) => {
        Object.values(err).map((err: any) => {
            toast.warning(err.message, {
                position: "top-left",
                pauseOnHover: false,
                draggable: 'touch'
            });
            return;
        });
    }

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
                        <form action="" onSubmit={handleSubmit(handleAddUser, onUserAddError)}>
                            <div className="dashboard-add-form-inputs">
                                <label>Full Name</label>
                                <input 
                                    {...register('username', {
                                        required: 'It seems you don\'t put an name'
                                    })}
                                    type="text" 
                                    placeholder="Enter full name" 
                                />
                            </div>

                            <div className="dashboard-add-form-inputs">
                                <label>Email Address</label>
                                <input
                                    {...register('email', { 
                                        required: 'It seems you don\'t put an email', 
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 
                                            message: "The email isn't valid!"
                                        },
                                        maxLength: {
                                            value: 100, 
                                            message: "You can only write 100 characters on email input!"
                                        } 
                                    })}  
                                    type="text" 
                                    placeholder="Enter email address" 
                                />
                            </div>

                            <div className="dashboard-add-form-inputs">
                                <label>Role</label>
                                <select>
                                    <option>User</option>
                                    <option>Moderator</option>
                                    <option>Admin</option>
                                </select>
                            </div>

                            <button className="dashboard-add-btn" type="submit">
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
                            <h2>User List ({stats.totalUsers})</h2>
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
                            {usersData.map((user, index) => (
                                <UserItems
                                    key={index}
                                    {...user}
                                    onDelete={handleRemoveUser}
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

            <ToastContainer />
        </div>
    )
};