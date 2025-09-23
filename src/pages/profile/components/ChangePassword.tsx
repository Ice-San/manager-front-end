import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";

type ChangePasswordType = {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordType>();
    const { t } = useTranslation("profile");

    const handleAdd = ({currentPassword, newPassword, confirmPassword}: ChangePasswordType) => {
        console.log(currentPassword);
        console.log(newPassword);
        console.log(confirmPassword);
    }

    const handleError = (err: any) => {
        console.log(err);
    }

    return (
        <form className="profile-password" onSubmit={handleSubmit(handleAdd, handleError)}>
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
            
            <button type='submit'>{t("password.update")}</button>
        </form>
    );
}