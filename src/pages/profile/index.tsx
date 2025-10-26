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
    full_name: string,
    email: string,
    phone_number: string,
    role: string,
    address: string,
    bio: string,
    status: string
}

const { VITE_API_ENDPOINT } = import.meta.env;

export const ProfilePage = () => {
    const { t } = useTranslation("profile");
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<ProfileFormType>({
        defaultValues: {
            full_name: '',
            email: '',
            address: '',
            phone_number: '',
            bio: '',
            role: 'admin',
            status: 'active'
        }
    });
    const [cookies] = useCookies(['token']);
    const navegate = useNavigate();
    const location = useLocation();
    const { email } = location.state;

    const [ createAtLabel, setCreateAtLabel ] = useState('');

    const handleUpdate = async (user: ProfileFormType) => {
        try {
            const response = await fetch(`${VITE_API_ENDPOINT}/users/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies?.token}`
                },
                body: JSON.stringify({
                    username: user.full_name, 
                    email: user.email,
                    address: user.address,
                    phone: user.phone_number,
                    bio: user.bio,
                    role: user.role,  
                    userStatus: user.status,
                })
            });
            const { status } = await response.json();

            if(status !== 200) {
                console.error("Updating Details was failed...");
                toast.error('Updating Details was failed...', {
                    position: "top-left",
                    pauseOnHover: false,
                    draggable: 'touch'
                });
                return;
            }

            setValue("full_name", user.full_name);
            setValue("email", email);
            setValue("phone_number", user.phone_number);
            setValue("bio", user.bio);
            setValue("address", user.address);
            setValue("role", user.role);
            setValue("status", user.status);

            toast.success('Updating Details worked successfully!', {
                position: "top-left",
                pauseOnHover: false,
                draggable: 'touch'
            });
        } catch (err) {
            console.error("Something went wrong: ", err);
        }
    }

    const handleError = (err: any) => {
        console.log(err);
    }

    useEffect(() => {
        (async () => {
            const auth = await validation(cookies?.token as string);
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
                        "Authorization": `Bearer ${cookies?.token}`
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

                setValue("full_name", data.username);
                setValue("email", data.email);
                setValue("phone_number", data.phone_number);
                setValue("bio", data.bio);
                setValue("address", data.address);
                setValue("role", data.user_type);
                setValue("status", data.status);
                
                setCreateAtLabel(data.account_created_at);
            } catch (err) {
                console.error("Something went wrong: ", err);
            }
        })();
    }, []);

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
                        <h1>{getValues("full_name")}</h1>
                        <p>{getValues("email")}</p>
                    </div>
                </div>

                <div className="profile-top-right">
                    <p data-role="User">{t(`top.role.${getValues("role")}`)}</p>
                    <p data-state="Active">{t(`top.status.${getValues("status")}`)}</p>
                    
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
                                    <p>{getInitials(getValues("full_name"))}</p>
                                </div>

                                <div className="profile-text">
                                    <h2>{getValues("full_name")}</h2>
                                    <p>Member since</p>
                                    <p>{formatDate(createAtLabel)}</p>
                                    <p>{t("lastlogin") + ": " + getTodayDate()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="profile-right-content">
                    <form id='profile-form' onSubmit={handleSubmit(handleUpdate, handleError)}>
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
                                        {...register("full_name", {
                                            required: t("info.fullname.required"),
                                            maxLength: {
                                                value: 100, 
                                                message: t("info.fullname.max-length")
                                            }
                                        })} 
                                        type="text"
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
                                        disabled={true}
                                    />
                                </div>
                            </div>

                            <div className="profile-basic-information-row">
                                <div className="profile-inputs">
                                    <label>{t("info.phone-number.title")}</label>
                                    <input 
                                        {...register("phone_number", {
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
                                    />
                                </div>

                                <div className="profile-inputs">
                                    <label>{t("top.role.title")}</label>
                                    <select {...register("role")}>
                                        <option value="admin">{t("top.role.admin")}</option>
                                        <option value="moderator">{t("top.role.moderator")}</option>
                                        <option value="user">{t("top.role.user")}</option>
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
                                />
                            </div>

                            <div className="profile-inputs">
                                <label>{t("top.status.title")}</label>
                                <select {...register("status")}>
                                    <option value="active">{t("top.status.active")}</option>
                                    <option value="inactive">{t("top.status.inactive")}</option>
                                </select>
                            </div>
                        </div>
                    </form>

                    <div className="horizontal-line"></div>

                    <ChangePassword email={email} />

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