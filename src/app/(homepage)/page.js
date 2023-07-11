import Home from "./Home";
import Accumulated from "@/app/components/accumulated/Accumulated";
import {getList} from "@/helpers/dataProvider";

const getAccumulated = async () => {
    try {
        return await getList(`/chefs/accumulated`).then(data => data.json())
    } catch {
        return {
            amount: 0
        }
    }
}
const HomePage = async () => {
    const accumulated = await getAccumulated()
    return (
        <>
            <Accumulated amount={accumulated.amount}/>
            <Home/>
        </>
    )
}

export default HomePage
