import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { validation } from "@helpers/validation";

import { IconsContainer } from "@assets/components/IconContainer";
import { UserItems } from "@assets/components/UserItem";
import { DashboardStats } from "@assets/components/DashboardStats";

import '@styles/index.css';
import './index.css';

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

    return (
        <div className="dashboard">
            <div className="dashboard-title">
                <h1>Manager</h1>
                <p>Manage your users efficiently with add, remove, and search functionality.</p>
            </div>

            <div className="dashboard-users">
                <div className="dashboard-add">
                    <div className="dashboard-add-title">
                        <IconsContainer imgSize="dashboard-add-icon" imgUrl="dashboard-add-container" />
                        <h2>Add New User</h2>
                    </div>
                    
                    <p>Fill in the details to add a new user to the system.</p>

                    <div className="dashboard-add-form">
                        <h2>Full Name</h2>
                        <input type="text" placeholder="Enter full name" />

                        <h2>Email Address</h2>
                        <input type="text" placeholder="Enter email address" />

                        <h2>Role</h2>
                        <select>
                            <option>User</option>
                            <option>Moderator</option>
                            <option>Admin</option>
                        </select>

                        <div className="dashboard-add-btn">
                            <IconsContainer imgSize="dashboard-add-icon" imgUrl="dashboard-add-container" />
                            <h2>Add User</h2>
                        </div>
                    </div>
                </div>

                <div className="dashboard-list">
                    <div className="dashboard-list-title">
                        <IconsContainer imgSize="dashboard-list-icon" imgUrl="dashboard-list-container" />
                        <h2>User List (3)</h2>
                    </div>

                    <p>Search and manage existing users in the system.</p>

                    <div className="dashboard-list-searchbar">
                        <IconsContainer imgSize="dashboard-list-searchbar-icon" imgUrl="dashboard-list-searchbar-container" />
                        <input type="text" placeholder="Search users by name, email or role..." />
                    </div>

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

            <div className="dashboard-stats">
                <DashboardStats icon="dashboard-total-icon" title="Total Users" value="3" />
                <DashboardStats icon="dashboard-admin-icon" title="Admins" value="1" />
                <DashboardStats icon="dashboard-user-icon" title="User" value="1" />
                <DashboardStats icon="dashboard-moderator-icon" title="Moderator" value="1" />
            </div>
        </div>
    )
};