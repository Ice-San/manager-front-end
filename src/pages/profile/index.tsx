import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';

import { Icon } from '@components/Icon';
import { SelectLanguage } from '@components/SelectLanguage';
import { ChangePassword } from './components/ChangePassword';

import { validation } from "@utils/validation";
import { getTodayDate } from '@utils/getTodayDate';

import '@styles/index.css';
import './styles/index.css';
import './styles/media-querys.css';
import { getInitials } from '@utils/getInitials';
import { formatDate } from '@utils/formatDate';

type ProfileFormType = {
    username: string,
    email: string,
    phone: string,
    role: string,
    address: string,
    bio: string,
    status: string
}

const userData = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    address: '',
    phone_number: '',
    bio: '',
    user_type: '',
    status: '',
    account_created_at: ''
}

const { VITE_API_ENDPOINT } = import.meta.env;

export const ProfilePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormType>();
    const [ user, setUser ] = useState(userData);

    const navegate = useNavigate();
    const location = useLocation();
    const { email } = location.state;

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

    const token = cookies?.token;

    useEffect(() => {
        (async () => {
            const auth = await validation(token as string);
            if(!auth) navegate('/');
        })();

        if(!email) navegate('/');
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${VITE_API_ENDPOINT}/users/details`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({email})
                });
                const { data, status } = await response.json();

                if(status !== 200) {
                    console.error("Getting Details was failed...");
                    toast.error('Getting Details was failed...', {
                        position: "top-left",
                        pauseOnHover: false,
                        draggable: 'touch'
                    });
                    return;
                }

                setUser(data);
            } catch (err) {
                console.error("Something went wrong: ", err);
            }
        })();
    }, [])

    const {
        username,
        address,
        phone_number,
        bio,
        user_type,
        status,
        account_created_at
     } = user;

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
                        <h1>{username}</h1>
                        <p>{email}</p>
                    </div>
                </div>

                <div className="profile-top-right">
                    <p data-role="User">{t(`top.role.${user_type}`)}</p>
                    <p data-state="Active">{t(`top.status.${status}`)}</p>
                    
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
                                    <p>{getInitials(username)}</p>
                                </div>

                                <div className="profile-text">
                                    <h2>{username}</h2>
                                    <p>Member since</p>
                                    <p>{formatDate(account_created_at)}</p>
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
                                        defaultValue={username}
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
                                        defaultValue={email}
                                    />
                                </div>
                            </div>

                            <div className="profile-basic-information-row">
                                <div className="profile-inputs">
                                    <label>{t("info.phone-number.title")}</label>
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
                                        defaultValue={phone_number} 
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
                                    defaultValue={address} 
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
                                    value={bio}
                                >
                                </textarea>
                            </div>

                            <div className="profile-inputs">
                                <label>{t("top.status.title")}</label>
                                <select {...register("status")}>
                                    <option defaultValue="active">{t("top.status.active")}</option>
                                    <option defaultValue="inactive">{t("top.status.inactive")}</option>
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

            <ToastContainer />
        </div>
    );
};