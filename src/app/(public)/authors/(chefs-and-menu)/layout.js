import Title from "@/app/(public)/authors/(chefs-and-menu)/Title"

const ChefsLayout = async ({children}) => {
    return (
        <>
            <Title/>
            {children}
        </>
    )
}

export default ChefsLayout