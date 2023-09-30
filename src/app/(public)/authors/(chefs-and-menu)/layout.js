import Title from "./Title"

const ChefsLayout = async ({children}) => {
    return (
        <>
            <Title/>
            {children}
        </>
    )
}

export default ChefsLayout
