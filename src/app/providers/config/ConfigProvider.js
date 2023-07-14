"use client"

import {createContext, useContext} from "react"
import PropTypes from "prop-types"

export const ConfigContext = createContext({
    config: {
        supportLink: undefined,
    },
})

export const useConfigContext = () => useContext(ConfigContext)

const ConfigProvider = (props) => {
    const {children, config} = props
    return (
        <ConfigContext.Provider value={{config}}>
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