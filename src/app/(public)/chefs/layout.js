import Title from "@/app/(public)/chefs/Title"

const ChefsLayout = async ({children}) => {
    return (
        <>
            <Title/>
            {children}
        </>
    )
}

export default ChefsLayout;