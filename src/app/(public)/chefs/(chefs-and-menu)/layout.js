import Title from "@/app/(public)/chefs/(chefs-and-menu)/Title"

const ChefsLayout = async ({children}) => {
    return (
        <>
            <Title/>
            {children}
        </>
    )
}

export default ChefsLayout