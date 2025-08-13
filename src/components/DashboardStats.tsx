import { Icon } from "./Icon";
import userListBlue from '@assets/img/user-list-blue.png';

type DashboardStatsType = {
    icon: string,
    title: string,
    value: string | number
}

export const DashboardStats = ({icon, title, value}: DashboardStatsType) => {
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