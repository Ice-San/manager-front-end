import { Icon } from '@components/Icon';
import { useTranslation } from 'react-i18next';

import '@styles/index.css';
import './styles/index.css';
import './styles/media-querys.css';

export const ProfilePage = () => {
    const { t } = useTranslation("dashboard");

    return (
        <>
            <div className="profile">
                <div className="profile-top">
                    <div className="profile-top-left">
                        <div className="profile-back-btn">
                            <Icon className='back-icon-size' url='/img/arrow-right.png' />
                            <p>{ t("back") }</p>
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
                            <p>{ t("savechanges") }</p>
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
                                        <p>{ t("lastlogin") }: 30/12/2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="profile-right-content">
                        <div className="profile-right-content-title">
                            <h2>{ t("userInfoTitle") }</h2>
                            <p>{ t("userInforSubtitle") }</p>
                        </div>

                        <div className="profile-basic-information">
                            <h2>{ t("basicInfo") }</h2>

                            <div className="profile-basic-information-row">
                                <div className="profile-inputs">
                                    <label>{ t("fullname") }</label>
                                    <input type="text" value='John Doe' />
                                </div>

                                <div className="profile-inputs">
                                    <label>{ t("email") }</label>
                                    <input type="text" value='john.doe@example.com' />
                                </div>
                            </div>

                            <div className="profile-basic-information-row">
                                <div className="profile-inputs">
                                    <label>{ t("phoneNumber") }</label>
                                    <input type="text" value='+1 (555) 123-4567' />
                                </div>

                                <div className="profile-inputs">
                                    <label>{ t("role") }</label>
                                    <select>
                                        <option value="Admins">{ t("roleAdminOption") }</option>
                                        <option value="Moderator">{ t("roleModeratorOption") }</option>
                                        <option value="User">{ t("roleUserOption") }</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="horizontal-line"></div>

                        <div className="profile-additional-details">
                            <h2>{ t("additionalDetails") }</h2>

                            <div className="profile-inputs">
                                <label>{ t("address") }</label>
                                <input type="text" value='123 Main St, New York, NY 10001' />
                            </div>

                            <div className="profile-inputs">
                                <label>{ t("bio") }</label>
                                <textarea rows={3} placeholder={ t("bioPlaceholder") }>Senior administrator with 5+ years of experience in user management and system administration.</textarea>
                            </div>

                            <div className="profile-inputs">
                                <label>{ t("accountStatus") }</label>
                                <select>
                                    <option value="Active">{ t("active") }</option>
                                    <option value="Inactive">{ t("inactive") }</option>
                                </select>
                            </div>
                        </div>

                        <div className="horizontal-line"></div>

                        <div className="profile-password">
                            <h2>{ t("changePassword") }</h2>

                            <div className="profile-basic-information-row">
                                <div className="profile-inputs">
                                    <label>{ t("currentPassword") }</label>
                                    <input type="text" placeholder={ t("currentPasswordPlaceholder") } />
                                </div>

                                <div className="profile-inputs">
                                    <label>{ t("newPassword") }</label>
                                    <input type="text" placeholder={ t("newPasswordPlaceholder") } />
                                </div>

                                <div className="profile-inputs">
                                    <label>{ t("confirmPassword") }</label>
                                    <input type="text" placeholder={ t("confirmPasswordPlaceholder") } />
                                </div>
                            </div>
                            
                            <button>{ t("updatePassword") }</button>
                        </div>

                        <div className="horizontal-line"></div>

                        <div className="profile-danger-zone">
                            <h2>{ t("dangerzone") }</h2>

                            <div className="profile-danger-conteiner">
                                <div className="profile-danger-left">
                                    <h4>{ t("deleteAccountTitle") }</h4>
                                    <p>{ t("deleteAccountSubtitle") }</p>
                                </div>

                                <div className="profile-danger-right">
                                    <div className="profile-danger-btn">
                                        <Icon className='danger-icon-size' url='/img/delete-white-icon.png' />
                                        <p>{ t("deleteUser") }</p>
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