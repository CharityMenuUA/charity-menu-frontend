"use client"
import styles from './homepage.module.scss'
import AttachmentsSlider from "@/app/(public)/authors/[chefId]/AttachmentsSlider"
import {useConfigContext} from "@/app/providers/config/ConfigProvider"

const HomeAttachments = () => {
    const {config} = useConfigContext()
    const {attachments} = config
    return attachments?.length && (
        <div className={styles.attachments}>
            <AttachmentsSlider attachments={attachments}/>
        </div>
    )
}

export default HomeAttachments
