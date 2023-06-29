import OtherChefs from "@/app/components/other-chefs/OtherChefs";

const Page = (props) => {
    const {params: {chefId}} = props
    return (
        <div>
            [menuId]
            <OtherChefs excludeId={chefId}/>
        </div>
    )
}
export default Page