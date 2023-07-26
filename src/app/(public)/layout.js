import SwitcherProvider from "@/app/components/switcher/Switcher"

const PublicLayout = async (props) => {
    const {children} = props
    return (
        <SwitcherProvider>
            {children}
        </SwitcherProvider>
    )
}

export default PublicLayout