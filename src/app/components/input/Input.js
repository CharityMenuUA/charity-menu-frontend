import style from './input.module.scss'
import PropTypes from "prop-types"

const Input = (props) => {
    const {label, name, register, onChange, onBlur, type = 'text', disabled, value, required} = props
    return (
        <fieldset className={style.input_fieldset}>
            {register ? (
                <input
                    type={type}
                    id={name}
                    name={name}
                    className={style.input}
                    placeholder={label}
                    disabled={disabled}
                    required={required}
                    {...register(name, {value: value})}
                />
            ) : (
                <input
                    value={value}
                    type={type}
                    id={name}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={style.input}
                    placeholder={label}
                    disabled={disabled}
                    required={required}
                />
            )}
            {label && (
                <label htmlFor={name} className={style.input_label}>
                    {label}
                </label>
            )}
        </fieldset>
    )
}
Input.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    register: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
}
export default Input