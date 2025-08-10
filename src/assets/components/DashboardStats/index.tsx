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
                    {icon ? <IconsContainer imgSize={icon} imgUrl="dashboard-stats-container" /> : <span data-role={title}>{title.charAt(0)}</span>}

                    <div className="dashboard-stats-title-content">
                        <h2>{title}</h2>
                        <p>{value}</p>
                    </div>
                </div>
            </div>
        </>
    );
}