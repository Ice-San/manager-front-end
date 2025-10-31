import { Icon } from "@components/Icon";

type StatsType = {
    icon: string,
    title: string,
    span: string
    value: string | number
}

export const Stats = ({icon, title, span, value}: StatsType) => {
    return (
        <>
            <div className="dashboard-stats-item">
                <div className="dashboard-stats-title">
                    {icon ? <Icon className={icon} url="/img/user-list-blue.png" /> : <span data-role={span}>{title.charAt(0)}</span>}

                    <div className="dashboard-stats-title-content">
                        <h2>{title}</h2>
                        <p>{value}</p>
                    </div>
                </div>
            </div>
        </>
    );
}