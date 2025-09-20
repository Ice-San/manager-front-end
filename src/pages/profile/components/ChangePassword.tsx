import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";

type ChangePasswordType = {
    currentp: string,
    newp: string,
    confirmp: string
}

export const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordType>();
    const { t } = useTranslation("profile");

    const handleAdd = ({currentp, newp, confirmp}: ChangePasswordType) => {
        console.log(currentp);
        console.log(newp);
        console.log(confirmp);
    }

    const handleError = (err: any) => {
        console.log(err);
    }

    return (
        <form className="profile-password" onSubmit={handleSubmit(handleAdd, handleError)}>
            <h2>{t("changepassword.title")}</h2>

            <div className="profile-basic-information-row">
                <div className="profile-inputs">
                    <label>{t("changepassword.current.label")}</label>
                    <input 
                        {...register("currentp", {
                            required: t("changepassword.current.required"),
                            maxLength: {
                                value: 100, 
                                message: t("changepassword.current.maxlength")
                            }
                        })}
                        type="password" 
                        placeholder={t("changepassword.current.placeholder")}
                    />
                </div>

                <div className="profile-inputs">
                    <label>{t("changepassword.new.label")}</label>
                    <input
                        {...register("newp", {
                            required: t("changepassword.new.required"),
                            maxLength: {
                                value: 100, 
                                message: t("changepassword.new.maxlength")
                            }
                        })} 
                        type="password" 
                        placeholder={t("changepassword.new.placeholder")}
                    />
                </div>

                <div className="profile-inputs">
                    <label>{t("changepassword.confirm.label")}</label>
                    <input
                        {...register("confirmp", {
                            required: t("changepassword.confirm.required"),
                            maxLength: {
                                value: 100, 
                                message: t("changepassword.confirm.maxlength")
                            }
                        })}  
                        type="password"
                        placeholder={t("changepassword.confirm.placeholder")}
                    />
                </div>
            </div>
            
            <button type='submit'>{t("changepassword.update")}</button>
        </form>
    );
}