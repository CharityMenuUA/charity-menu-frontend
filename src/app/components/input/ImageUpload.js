import styles from './input.module.scss'
import {useForm} from "react-hook-form"
import PropTypes from "prop-types"
import Image from "next/image"
import {RiUpload2Line} from "react-icons/ri"
import style from "@/app/components/input/input.module.scss"

const ImageUpload = (props) => {
    const {name, title, description, onSubmit, onClear, image} = props
    const {register} = useForm()

    const onChange = async ({target}) => {
        if (target.files.length) {
            const formData = new FormData()
            formData.append("file", target.files[0])
            if (typeof onSubmit === "function") onSubmit(formData)
        }
    }

    return (
        <fieldset className={style.input_fieldset}>
            <div className={styles.image}>
                {image ? (
                    <div className={styles.labelWrap}>
                        <Image src={image} width={100} height={100} alt={"Profile"} className={styles.img}/>
                        <button onClick={onClear} className={styles.delete}>Видалити</button>
                    </div>
                ) : (
                    <label className={styles.labelWrap}>
                        <div className={styles.text}>
                            <h3>{title}</h3>
                            <p>{description}</p>
                        </div>
                        <RiUpload2Line/>
                        <input {...register(name, {onChange})} name={name} type="file" accept="image/*" hidden/>
                    </label>
                )}
            </div>
        </fieldset>
    )
}

ImageUpload.propTypes = {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    errors: PropTypes.shape({}),
}
export default ImageUpload
