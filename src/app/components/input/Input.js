import style from './input.module.scss'
import PropTypes from "prop-types"
import {useConfigContext} from "@/app/providers/config/ConfigProvider"
import _ from 'lodash'


const Input = (props) => {
    const {fields} = useConfigContext()
    const {label, name, register, onChange, onBlur, type = 'text', disabled, value, required, errors, pattern} = props
    const error = _.get(errors, name);
    const regexName = name.split('.').slice(-1)[0]
    const regex = fields?.[regexName]?.regex
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
                    {...register(name, {
                        value: value,
                        required: required && (typeof required === "string" ? required : `Заповніть поле ${label ? `"${label}"` : ""}`),
                        pattern: (pattern?.value || regex) && {
                            value: pattern?.value || (regex && new RegExp(regex)),
                            message: pattern?.message || `Невірно вказані дані поля ${label ? `"${label}"` : ""}`
                        },
                    })}
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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    register: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    errors: PropTypes.shape({}),
    pattern: PropTypes.shape({
        value: PropTypes.instanceOf(RegExp),
        message: PropTypes.string,
    }),
}
export default Input