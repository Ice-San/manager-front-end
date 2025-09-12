import { Icon } from '@components/Icon';

import '@styles/index.css';
import './styles/index.css';
import './styles/media-querys.css';

export const ProfilePage = () => {
    return (
        <>
            <div className="profile">
                <div className="profile-top">
                    <div className="profile-top-left">
                        <div className="profile-back-btn">
                            <Icon className='back-icon-size' url='/img/arrow-right.png' />
                            <p>Back to Users</p>
                        </div>

                        <div className="profile-top-info">
                            <h1>John Doe</h1>
                            <p>john.doe@example.com</p>
                        </div>
                    </div>

                    <div className="profile-top-right">
                        <p data-role='Admin'>Admin</p>
                        <p data-state='Active'>Active</p>
                        
                        <div className="profile-save-btn">
                            <Icon className='save-icon-size' url='/img/save-icon.png' />
                            <p>Save Changes</p>
                        </div>
                    </div>
                </div>
            
                <div className="profile-content">
                    <div className="profile-left-content">
                        <div className="profile-left-content-inside">
                            <div className="profile-left-content-space">
                                <div className="profile-left-content-info">
                                    <div className="profile-icon">
                                        <p>JD</p>
                                    </div>

                                    <div className="profile-text">
                                        <h2>John Doe</h2>
                                        <p>Member since</p>
                                        <p>15/01/2024</p>
                                        <p>Last login: 30/12/2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="profile-right-content">
                        <div className="profile-right-content-title">
                            <h2>User Information</h2>
                            <p>View user profile and account details</p>
                        </div>

                        <div className="profile-basic-information">
                            <h2>BASIC INFORMATION</h2>

                            <div className="profile-basic-information-row">
                                <div className="profile-inputs">
                                    <label>Full Name</label>
                                    <input type="text" value='John Doe' />
                                </div>

                                <div className="profile-inputs">
                                    <label>Email Adress</label>
                                    <input type="text" value='john.doe@example.com' />
                                </div>
                            </div>

                            <div className="profile-basic-information-row">
                                <div className="profile-inputs">
                                    <label>Phone Number</label>
                                    <input type="text" value='+1 (555) 123-4567' />
                                </div>

                                <div className="profile-inputs">
                                    <label>Role</label>
                                    <select>
                                        <option value="Admins">Admins</option>
                                        <option value="Moderator">Moderator</option>
                                        <option value="User">User</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="horizontal-line"></div>

                        <div className="profile-additional-details">
                            <h2>ADDITIONAL DETAILS</h2>

                            <div className="profile-inputs">
                                <label>Address</label>
                                <input type="text" value='123 Main St, New York, NY 10001' />
                            </div>

                            <div className="profile-inputs">
                                <label>Bio</label>
                                <textarea rows={3} placeholder='Enter Bio'>Senior administrator with 5+ years of experience in user management and system administration.</textarea>
                            </div>

                            <div className="profile-inputs">
                                <label>Account Status</label>
                                <select>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="horizontal-line"></div>

                        <div className="profile-password">
                            <h2>CHANGE PASSWORD</h2>

                            <div className="profile-basic-information-row">
                                <div className="profile-inputs">
                                    <label>Current Password</label>
                                    <input type="text" placeholder='Enter current password' />
                                </div>

                                <div className="profile-inputs">
                                    <label>New Password</label>
                                    <input type="text" placeholder='Enter new password' />
                                </div>

                                <div className="profile-inputs">
                                    <label>Confirm Password</label>
                                    <input type="text" placeholder='Enter new password' />
                                </div>
                            </div>
                            
                            <button>Update Password</button>
                        </div>

                        <div className="horizontal-line"></div>

                        <div className="profile-danger-zone">
                            <h2>DANGER ZONE</h2>

                            <div className="profile-danger-conteiner">
                                <div className="profile-danger-left">
                                    <h4>Delete User Account</h4>
                                    <p>This action cannot be undone. This will permanently delete the user account.</p>
                                </div>

                                <div className="profile-danger-right">
                                    <div className="profile-danger-btn">
                                        <Icon className='danger-icon-size' url='/img/delete-white-icon.png' />
                                        <p>Delete User</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}