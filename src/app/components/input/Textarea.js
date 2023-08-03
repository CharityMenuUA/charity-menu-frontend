import style from './input.module.scss'
import PropTypes from "prop-types"
import Textarea from "react-textarea-autosize"

const Input = (props) => {
    const {label, name, register, onChange, onBlur, type = 'text', disabled, value, required,errors} = props;
    const error = errors?.[name]
    return (
        <fieldset className={style.input_fieldset}>
            {register ? (
                <Textarea
                    type={type}
                    id={name}
                    name={name}
                    className={style.textarea}
                    placeholder={label}
                    disabled={disabled}
                    required={required}
                    {...register(name, {
                        value: value,
                        required: required,
                    })}
                />
            ) : (
                <Textarea
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
            {error && (
                <div className={style.error}>
                    {error.message}
                </div>
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
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    errors: PropTypes.shape({}),
}
export default Input