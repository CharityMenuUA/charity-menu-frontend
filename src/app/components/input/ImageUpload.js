import styles from './input.module.scss'
import {useForm} from "react-hook-form"
import PropTypes from "prop-types"
import Image from "next/image"
import {RiUpload2Line} from "react-icons/ri"
import style from "@/app/components/input/input.module.scss"
import Cropper, {ReactCropperElement} from "react-cropper"
import "cropperjs/dist/cropper.css"
import {createRef, useState} from "react"

function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], {type: mimeString})
}

const ImageUpload = (props) => {
    const {name, title, description, onSubmit, onClear, image} = props
    const {register} = useForm()
    const [cropImage, setCropImage] = useState('')
    const cropperRef = createRef()
    const onChange = async (e) => {
        e.preventDefault()
        let files
        if (e.dataTransfer) {
            files = e.dataTransfer.files
        } else if (e.target) {
            files = e.target.files
        }
        const reader = new FileReader()
        reader.onload = () => {
            setCropImage(reader.result)
        }
        reader.readAsDataURL(files[0])
    }
    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const file = cropperRef.current?.cropper.getCroppedCanvas({maxWidth: 500, maxHeight: 500}).toDataURL()
            const formData = new FormData()
            formData.append("file", DataURIToBlob(file))
            if (typeof onSubmit === "function") onSubmit(formData)
            setCropImage('')
        }
    }

    return (
        <fieldset className={style.input_fieldset}>
            {cropImage ? (
                <div>
                    <Cropper
                        ref={cropperRef}
                        aspectRatio={1}
                        style={{height: 300, width: "100%"}}
                        src={cropImage}
                        className={style.cropper}
                    />

                    <button className={styles.delete} onClick={getCropData}>
                        Зберегти
                    </button>
                </div>
            ) : (
                <div className={styles.image}>
                    {image ? (
                        <div className={styles.labelWrap}>
                            <div className={styles.img}>
                                <Image src={`${image}?${Date.now()}`} fill alt={"Profile"} style={{
                                    objectFit: 'cover',
                                }}/>
                            </div>
                            <button onClick={onClear} className={styles.delete}>Замінити</button>
                        </div>
                    ) : (
                        <label className={styles.labelWrap}>
                            <div className={styles.text}>
                                <h3>{title}</h3>
                                <p>{description}</p>
                            </div>
                            <RiUpload2Line/>
                            <input {...register(name, {onChange})} name={name} type="file" accept="image/png, image/jpeg" hidden/>
                        </label>
                    )}
                </div>
            )}
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
