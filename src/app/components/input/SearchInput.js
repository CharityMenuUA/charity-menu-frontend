import style from './input.module.scss'
import PropTypes from "prop-types"

const SearchInput = (props) => {
    const {placeholder, name, onChange, onBlur, onClear, disabled, value, required} = props
    return (
        <div className={style.searchWrap}>
            <input
                value={value}
                type={'search'}
                id={name}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                className={style.search}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
            />
            {value ? (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" onClick={onClear}
                     style={{cursor: "pointer"}}>
                    <path d="M12.9287 12.929L27.0708 27.0711" stroke="black"/>
                    <path d="M12.9287 27.071L27.0708 12.9289" stroke="black"/>
                </svg>
            ) : (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M24 24L31 31" stroke="black"/>
                    <circle cx="18" cy="18" r="9" stroke="black"/>
                </svg>
            )}

        </div>
    )
}
SearchInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    register: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
}
export default SearchInput