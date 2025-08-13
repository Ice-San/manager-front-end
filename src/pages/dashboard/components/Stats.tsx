import { Icon } from "@components/Icon";
import userListBlue from '@assets/img/user-list-blue.png';

type StatsType = {
    icon: string,
    title: string,
    value: string | number
}

export const Stats = ({icon, title, value}: StatsType) => {
    return (
        <>
            <div className="dashboard-stats-item">
                <div className="dashboard-stats-title">
                    {icon ? <Icon className={icon} url={userListBlue} /> : <span data-role={title}>{title.charAt(0)}</span>}

                    <div className="dashboard-stats-title-content">
                        <h2>{title}</h2>
                        <p>{value}</p>
                    </div>
                </div>
            </div>
        </>
    );
}