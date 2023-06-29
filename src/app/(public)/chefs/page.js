import {getList} from '@/helpers/dataProvider';
import Link from "next/link";

const getChef = async () => {
    return getList(`/chefs`).then(data => data.json()).catch(console.error);
}

const Page = async (props) => {
    const {params} = props
    const {chefs} = await getChef(params);
    return (
        <div>
            {chefs.map((chef) => (
                <div key={chef.id}>
                    <Link href={`/chefs/${chef.id}`}>
                        {chef.name}
                    </Link>
                </div>
            ))}
        </div>
    )
}
export default Page;