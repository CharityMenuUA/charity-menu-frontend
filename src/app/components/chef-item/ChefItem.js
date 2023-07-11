import style from './chefItem.module.scss'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'

const ChefItem = (props) => {
    const {id, photo, menuItemsNumber, name} = props
    return (
        <Link href={`/chefs/${id}`} className={style.chefs}>
            <div className={style.photo}>
                <Image
                    alt={name}
                    src={photo}
                    fill
                    sizes="170px"
                    quality={100}
                    style={{
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div className={style.content}>
                <div className={style.name}>
                    {name}
                </div>
                <div className={style.count}>
                    {menuItemsNumber} лотів
                </div>
            </div>
            <div className={style.button}>
                профайл
            </div>
        </Link>
    )
}

ChefItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    menuItemsNumber: PropTypes.number.isRequired,
}
export default ChefItem