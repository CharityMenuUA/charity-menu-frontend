"use client";
import style from './menuItem.module.scss'
import PropTypes from 'prop-types';
import Link from "next/link";
import {useUserContext} from "@/app/firebase/firebase/UserProvider";
import Image from "next/image";

const MenuItem = (props) => {
    const {user} = useUserContext();
    const {id, chefId, chefName, chefPhoto, title, price} = props;
    const linkToCreateOrder = `/chefs/${chefId}/${id}`;
    return (
        <div className={style.item}>
            <Link href={`/chefs/${chefId}/${id}`} className={style.link}>
                <div className={style.photo}>
                    <Image
                        alt={chefName}
                        src={chefPhoto}
                        fill
                        sizes="100px"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <div className={style.name}>
                    {chefName}
                </div>
                <div className={style.title}>
                    {title}
                </div>
                <div className={style.price}>
                    ₴{price}
                </div>
            </Link>
            {user ? (
                <Link href={linkToCreateOrder} className={style.button}>
                    купити
                </Link>
            ) : (
                <Link href={`/login?next=${linkToCreateOrder}`} className={style.button}>
                    купити
                </Link>
            )}
        </div>
    );
}

MenuItem.propTypes = {
    id: PropTypes.number.isRequired,
    chefId: PropTypes.number.isRequired,
    chefName: PropTypes.string.isRequired,
    chefPhoto: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    available: PropTypes.bool.isRequired,
}

export default MenuItem