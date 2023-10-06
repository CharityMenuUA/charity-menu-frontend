import TeamPage from "@/app/(static)/team/client-page"

const meta = {
    title: 'Команда - Досвід та відданість справі',
    description: 'Познайомтеся із членами нашої команди, які об\'єднали досвід та відданість справі ЗСУ.',
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
