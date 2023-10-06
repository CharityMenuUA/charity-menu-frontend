'use client'

import {useConfigContext} from "@/app/providers/config/ConfigProvider";
import TeamItem from "@/app/(static)/team/team-item/TeamItem";
import style from './team.module.scss';

const TeamPage = () => {
    const configContext = useConfigContext()
    const { config } = configContext;
    const { team } = config;

    return (
        <div className={style.teamPage}>
            <div className={style.teamPage_inner}>
                <div className={style.teamPage_head}>
                    <h1>Команда</h1>
                </div>

                <div className={style.teamPage_grid}>
                    {team.map((teamItem, teamItemKey) => {
                        const {name, photo, position, contacts} = teamItem;
                        return (
                            <TeamItem
                                name={name}
                                photo={photo}
                                position={position}
                                key={teamItemKey}
                                contacts={contacts}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default TeamPage
