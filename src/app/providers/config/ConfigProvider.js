"use client"

import {createContext, useContext, useMemo} from "react"
import PropTypes from "prop-types"

export const ConfigContext = createContext({
    config: {
        supportLink: undefined,
        deliveryFields: []
    },
    fields: {}
})

export const useConfigContext = () => useContext(ConfigContext)

const ConfigProvider = (props) => {
    const {children, config} = props
    const fields = useMemo(() => {
        const fields = {}
        if (config?.deliveryFields?.length) {
            config.deliveryFields.forEach((deliveryField) => {
                deliveryField.fields.forEach((field) => {
                    if (field.field) fields[field.field] = field
                    if (field.profileField) fields[field.profileField] = field
                })
            })
        }
        return fields
    }, [config])
    const value = useMemo(() => ({config, fields}), [config, fields])
    return (
        <ConfigContext.Provider value={value}>
            {children}
        </ConfigContext.Provider>
    )
}
ConfigProvider.propTypes = {
    config: PropTypes.shape({
        supportLink: PropTypes.string
    }).isRequired
}
export default ConfigProvider