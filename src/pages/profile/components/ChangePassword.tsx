import { useCookies } from 'react-cookie';
import { useForm,  } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

type ChangePasswordType = {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

type EmailType = {
    email: string
}

const { VITE_API_ENDPOINT } = import.meta.env;

export const ChangePassword = ({email}: EmailType) => {
    const { t } = useTranslation("profile");
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ChangePasswordType>();
    const [cookies] = useCookies(['token']);

    const currentPasswordInput = watch("currentPassword");
    const newPasswordInput = watch("newPassword");
    const confirmPasswordInput = watch("confirmPassword");

    const handleUpdate = async ({currentPassword, newPassword, confirmPassword}: ChangePasswordType) => {
        if(currentPassword !== confirmPassword) {
            toast.error('Passwords doesn\'t match!', {
                position: "top-left",
                pauseOnHover: false,
                draggable: 'touch'
            });
            return;
        }

        try {
            const response = await fetch(`${VITE_API_ENDPOINT}/users/password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies?.token}`
                },
                body: JSON.stringify({email, newPassword})
            });
            const { status } = await response.json();

            if(status !== 200) {
                console.error("Updating Password was failed...");
                toast.error('Updating Details was failed...', {
                    position: "top-left",
                    pauseOnHover: false,
                    draggable: 'touch'
                });
                return;
            }

            toast.success('Updating Password worked successfully!', {
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

    return (
        <form className="profile-password" onSubmit={handleSubmit(handleUpdate, handleError)}>
            <h2>{t("password.title")}</h2>

            <div className="profile-basic-information-row">
                <div className="profile-inputs">
                    <label>{t("password.current.label")}</label>
                    <input 
                        {...register("currentPassword", {
                            required: t("password.current.required"),
                            maxLength: {
                                value: 100, 
                                message: t("password.current.maxlength")
                            }
                        })}
                        type="password" 
                        placeholder={t("password.current.placeholder")}
                    />
                </div>

                <div className="profile-inputs">
                    <label>{t("password.new.label")}</label>
                    <input
                        {...register("newPassword", {
                            required: t("password.new.required"),
                            maxLength: {
                                value: 100, 
                                message: t("password.new.maxlength")
                            }
                        })} 
                        type="password" 
                        placeholder={t("password.new.placeholder")}
                    />
                </div>

                <div className="profile-inputs">
                    <label>{t("password.confirm.label")}</label>
                    <input
                        {...register("confirmPassword", {
                            required: t("password.confirm.required"),
                            maxLength: {
                                value: 100, 
                                message: t("password.confirm.max-length")
                            }
                        })}  
                        type="password"
                        placeholder={t("password.confirm.placeholder")}
                    />
                </div>
            </div>
            
            <button type='submit' disabled={!currentPasswordInput || !newPasswordInput || !confirmPasswordInput} >{t("password.update")}</button>
        </form>
    );
}