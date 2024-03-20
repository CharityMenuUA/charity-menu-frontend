import TeamPage from "@/app/(static)/team/client-page"

export const revalidate = 10;

const meta = {
    title: 'Команда - люди, які створили цей сайт',
    description: 'Познайомтеся із членами нашої команди, саме вони втілили у життя цей проект.',
}
export const metadata = {
    ...meta,
    openGraph: {
        ...meta,
    }
}


export default function TeamPageMeta() {
    return <TeamPage/>
}
