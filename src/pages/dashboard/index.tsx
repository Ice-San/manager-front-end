import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { validation } from "@utils/validation";
import { ToastContainer, toast } from 'react-toastify';

import { Icon } from "@components/Icon";
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
                        <form onSubmit={handleSubmit(handleAdd, handleError)}>
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
                                <select {...register('role')}>
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

                <List users={users} setUsers={setUsers} stats={stats} />
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