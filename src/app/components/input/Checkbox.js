import style from './input.module.scss'
import PropTypes from "prop-types"

const Checkbox = (props) => {
    const {label = props.children, name, register, onChange, onBlur, disabled, value, required, errors,checked} = props
    const error = errors?.[name]
    return (
        <fieldset className={style.input_fieldset}>
            {register ? (
                <input
                    type={"checkbox"}
                    id={name}
                    name={name}
                    className={style.checkbox}
                    disabled={disabled}
                    {...register(name, {
                        value: value,
                        required: required,
                    })}
                />
            ) : (
                <input
                    value={value}
                    type={"checkbox"}
                    id={name}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={style.checkbox}
                    disabled={disabled}
                    checked={checked}
                />
            )}
            {label && (
                <label htmlFor={name} className={style.checkbox_label}>
                    <span className={style.check}></span>
                    <span>{label}</span>
                </label>
            )}
            {error && (
                <div className={style.error}>
                    {error.message}
                </div>
            )}
        </fieldset>
    )
}
Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    checked: PropTypes.bool,
    label: PropTypes.string,
    register: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    errors: PropTypes.shape({})

}
export default Checkbox
