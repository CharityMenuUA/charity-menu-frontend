import style from './input.module.scss'
import TextareaAutosize from 'react-textarea-autosize';

const Input = (props) => {
    const {label, name, register, onChange, onBlur, type = 'text', value} = props;
    return (
        <fieldset className={style.input_fieldset}>
            {label && (
                <label htmlFor={name} className={style.input_label}>
                    {label}
                </label>
            )}
            {register ? (
                <TextareaAutosize value={value} type={type} id={name} {...register(name)} className={style.input}/>
            ) : (
                <TextareaAutosize value={value} type={type} id={name} name={name} onChange={onChange} onBlur={onBlur}
                                  className={style.input}/>
            )}
        </fieldset>
    )
}

export default Input