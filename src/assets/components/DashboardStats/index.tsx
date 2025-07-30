import { IconsContainer } from "../IconContainer";

type DashboardStatsType = {
    icon: string,
    title: string,
    value: string
}

export const DashboardStats = ({icon, title, value}: DashboardStatsType) => {
    return (
        <>
            <div className="dashboard-stats-item">
                <div className="dashboard-stats-title">
                    <IconsContainer imgSize={icon} imgUrl="dashboard-stats-container" />
                    {icon === "dashboard-total-icon" ? <IconsContainer imgSize={icon} imgUrl="dashboard-stats-container" /> : <p>{title.charAt(0)}</p>}
                    <h2>{title}</h2>
                </div>

                <p>{value}</p>
            </div>
        </>
    );
}