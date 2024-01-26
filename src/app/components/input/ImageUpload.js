import {useForm, useWatch} from "react-hook-form"
import {useEffect} from "react"
import PropTypes from "prop-types"
import Image from "next/image"

const ImageUpload = (props) => {
    const {name, label, onSubmit, image} = props
    const {register, control} = useForm()

    const file = useWatch({control, name})

    useEffect(() => {
        if (file) {
            console.log(file)
            const formData = new FormData()
            formData.append("file", file[0])
            if (typeof onSubmit === "function") onSubmit(formData)
        }
    }, [file, onSubmit])

    return (
        <>
            {image && (
                <Image src={image} width={100} height={100} alt={"Profile"}/>
            )}
            {label}
            <input {...register(name)} name={name} type="file"/>
        </>

    )
}

ImageUpload.propTypes = {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string,
    image: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    errors: PropTypes.shape({}),
}
export default ImageUpload
