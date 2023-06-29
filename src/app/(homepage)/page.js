import HomePage from "./HomePage";
import Accumulated from "@/app/components/accumulated/Accumulated";
import {getList} from "@/helpers/dataProvider";

const getAccumulated = async () => {
    try {
        return getList(`/chefs/accumulated`).then(data => data.json())
    } catch {
        return {
            amount: 0
        }
    }
}
const Home = async () => {
    const accumulated = await getAccumulated()
    return (
        <>
            <Accumulated amount={accumulated.amount}/>
            <HomePage/>
        </>
    )
}

export default Home
