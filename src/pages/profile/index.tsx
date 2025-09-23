import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

import { Icon } from '@components/Icon';
import { SelectLanguage } from '@components/SelectLanguage';
import { ChangePassword } from './components/ChangePassword';

import { validation } from "@utils/validation";
import { getTodayDate } from '@utils/getTodayDate';

import '@styles/index.css';
import './styles/index.css';
import './styles/media-querys.css';

type ProfileFormType = {
    username: string,
    email: string,
    phone: string,
    role: string,
    address: string,
    bio: string,
    status: string
}

export const ProfilePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormType>();
    const navegate = useNavigate();
    const [cookies] = useCookies(['token']);
    const { t } = useTranslation("profile");

    const handleAdd = ({username, email, phone, role, address, bio, status}: ProfileFormType) => {
        console.log(username);
        console.log(email);
        console.log(phone);
        console.log(role);
        console.log(address);
        console.log(bio);
        console.log(status);
    }

    const handleError = (err: any) => {
        console.log(err);
    }

    useEffect(() => {
        const token = cookies?.token;

        (async () => {
            const auth = await validation(token as string);
            if(!auth) navegate('/');
        })();
    },[]);

    return (
        <div className="profile">
            <div className="profile-top">
                <div className="profile-top-left">
                    <Link to='/account'>
                        <div className="profile-back-btn">
                            <Icon className='back-icon-size' url='/img/arrow-right.png' />
                            <p>{t("back")}</p>
                        </div>
                    </Link>

                    <div className="profile-top-info">
                        <h1>John Doe</h1>
                        <p>john.doe@example.com</p>
                    </div>
                </div>

                <div className="profile-top-right">
                    <p data-role="User">{t("top.role.admin")}</p>
                    <p data-state="Active">{t("top.status.active")}</p>
                    
                    <button className="profile-save-btn" form='profile-form' type='submit'>
                        <Icon className='save-icon-size' url='/img/save-icon.png' />
                        {t("save")}
                    </button>

                    <SelectLanguage />
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
                                    <p>{getTodayDate()}</p>
                                    <p>{t("lastlogin") + ": " + getTodayDate()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="profile-right-content">
                    <form id='profile-form' onSubmit={handleSubmit(handleAdd, handleError)}>
                        <div className="profile-right-content-title">
                            <h2>{t("userinfo.title")}</h2>
                            <p>{t("userinfo.subtitle")}</p>
                        </div>

                        <div className="profile-basic-information">
                            <h2>{t("info.title")}</h2>

                            <div className="profile-basic-information-row">
                                <div className="profile-inputs">
                                    <label>{t("info.fullname.title")}</label>
                                    <input 
                                        {...register("username", {
                                            required: t("info.fullname.required"),
                                            maxLength: {
                                                value: 100, 
                                                message: t("info.fullname.max-length")
                                            }
                                        })} 
                                        type="text" 
                                        defaultValue="John Doe" 
                                    />
                                </div>

                                <div className="profile-inputs">
                                    <label>{t("info.email.title")}</label>
                                    <input 
                                        {...register("email", {
                                            required: t("info.email.required"),
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 
                                                message: t("info.email.pattern")
                                            },
                                            maxLength: {
                                                value: 100, 
                                                message: t("info.email.max-length")
                                            } 
                                        })}
                                        type="text" 
                                        defaultValue="john.doe@example.com"
                                    />
                                </div>
                            </div>

                            <div className="profile-basic-information-row">
                                <div className="profile-inputs">
                                    <label>{t("info.phoneNumber.title")}</label>
                                    <input 
                                        {...register("phone", {
                                            required: t("info.phone-number.required"),
                                            pattern: {
                                                value: /^\+?[0-9]{1,4}([ -]?\(?[0-9]{1,5}\)?)*([ -]?[0-9]{2,15})+$/, 
                                                message: t("info.phone-number.pattern")
                                            },
                                            maxLength: {
                                                value: 30, 
                                                message: t("info.phone-number.max-length")
                                            } 
                                        })}
                                        type="tel" 
                                        defaultValue='+1 (555) 123-4567' 
                                    />
                                </div>

                                <div className="profile-inputs">
                                    <label>{t("top.role.title")}</label>
                                    <select {...register("role")}>
                                        <option defaultValue="admin">{t("top.role.admin")}</option>
                                        <option defaultValue="moderator">{t("top.role.moderator")}</option>
                                        <option defaultValue="user">{t("top.role.user")}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="horizontal-line"></div>

                        <div className="profile-additional-details">
                            <h2>{t("details.title")}</h2>

                            <div className="profile-inputs">
                                <label>{t("details.address.title")}</label>
                                <input 
                                    {...register("address", {
                                        maxLength: {
                                            value: 255, 
                                            message: t("details.address.max-length")
                                        } 
                                    })}
                                    type="text" 
                                    defaultValue='123 Main St, New York, NY 10001' 
                                />
                            </div>

                            <div className="profile-inputs">
                                <label>{t("details.biography.title")}</label>
                                <textarea
                                    {...register("bio", {
                                        maxLength: {
                                            value: 255, 
                                            message: t("details.biography.max-length")
                                        } 
                                    })} 
                                    rows={3} 
                                    placeholder={t("details.biography.placeholder")}
                                >
                                    Senior administrator with 5+ years of experience in user management and system administration.
                                </textarea>
                            </div>

                            <div className="profile-inputs">
                                <label>{t("top.status.title")}</label>
                                <select {...register("status")}>
                                    <option defaultValue="Active">{t("top.status.active")}</option>
                                    <option defaultValue="Inactive">{t("top.status.inactive")}</option>
                                </select>
                            </div>
                        </div>
                    </form>

                    <div className="horizontal-line"></div>

                    <ChangePassword />

                    <div className="horizontal-line"></div>

                    <div className="profile-danger-zone">
                        <h2>{t("dangerzone.title")}</h2>

                        <div className="profile-danger-conteiner">
                            <div className="profile-danger-left">
                                <h4>{t("dangerzone.delete.title")}</h4>
                                <p>{t("dangerzone.delete.subtitle")}</p>
                            </div>

                            <div className="profile-danger-right">
                                <div className="profile-danger-btn">
                                    <Icon className='danger-icon-size' url='/img/delete-white-icon.png' />
                                    <p>{t("dangerzone.delete.button")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};