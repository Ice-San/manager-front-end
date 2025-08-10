import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { validation } from "@helpers/validation";

import { IconsContainer } from "@assets/components/IconContainer";
import { UserItems } from "@assets/components/UserItem";
import { DashboardStats } from "@assets/components/DashboardStats";

import '@styles/index.css';
import './styles/index.css';
import './styles/media-querys.css';

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

    const userItems = [
        {
            username: "John Doe",
            role: "Admin",
            state: "Active",
            email: "john.doe@example.com",
            joined: "1/15/2024"
        },
        {
            username: "Jane Smith",
            role: "User",
            state: "Active",
            email: "jane.smith@example.com",
            joined: "2/20/2024"
        },
        {
            username: "Mike Johnson",
            role: "Moderator",
            state: "Inactive",
            email: "mike.johnson@example.com",
            joined: "3/10/2024"
        }
    ];

    const statsItems = [
        {
            icon: "dashboard-total-icon",
            title: "Total Users",
            value: "3"
        },
        {
            icon: "",
            title: "Admins",
            value: "1"
        },
        {
            icon: "",
            title: "Moderators",
            value: "1"
        },
        {
            icon: "",
            title: "Users",
            value: "1"
        }
    ]

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
                            <IconsContainer imgSize="dashboard-add-icon" imgUrl="dashboard-add-container" />
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
                                <IconsContainer imgSize="dashboard-add-icon-btn" imgUrl="dashboard-add-container-btn" />
                                Add User
                            </button>
                        </form>
                    </div>
                </div>

                <div className="dashboard-list">
                    <div className="dashboard-list-title">
                        <div className="dashboard-list-title-top">
                            <IconsContainer imgSize="dashboard-list-icon" imgUrl="dashboard-list-container" />
                            <h2>User List (3)</h2>
                        </div>
                    
                        <div className="dashboard-list-title-bottom">
                            Search and manage existing users in the system.
                        </div>
                    </div>

                    <div className="dashboard-list-content">
                        <div className="dashboard-list-searchbar">
                            <IconsContainer imgSize="dashboard-list-searchbar-icon" imgUrl="dashboard-list-searchbar-container" />
                            <input type="text" placeholder="Search users by name, email or role..." />
                        </div>

                        <div className="dashboard-list-users">
                            {userItems.map((userItem, index) => (
                                <UserItems
                                    key={index}
                                    username={userItem.username}
                                    role={userItem.role}
                                    state={userItem.state}
                                    email={userItem.email}
                                    joined={userItem.joined}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-stats">
                {statsItems.map((statsItem, index) => (
                    <DashboardStats
                        key={index}
                        icon={statsItem.icon}
                        title={statsItem.title}
                        value={statsItem.value}
                    />
                ))}
            </div>
        </div>
    )
};