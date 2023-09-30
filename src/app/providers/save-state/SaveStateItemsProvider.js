"use client"

import {createContext, useCallback, useContext, useState} from "react"
import {menuSortValues, chefsSortValues} from "@/app/(public)/authors/(chefs-and-menu)/sortValues"

export const SaveStateContext = createContext({
    authors: {
        sort: chefsSortValues[0].value,
        search: '',
        page: 0,
        items: [],
        setAuthors: (sort = '', search = '', page = 0, items = []) => undefined
    },
    menu: {
        sort: menuSortValues[0].value,
        search: '',
        page: 0,
        items: [],
        setMenu: (sort = '', search = '', page = 0, items = []) => undefined
    }
})

export const useAuthorsContext = () => {
    const context = useContext(SaveStateContext)
    return context.authors
}

export const useMenuContext = () => {
    const context = useContext(SaveStateContext)
    return context.menu
}

const SaveStateProvider = (props) => {
    const {children} = props
    const {authors: authorsContext, menu: menuContext} = useContext(SaveStateContext)
    const [authors, setStateAuthors] = useState(authorsContext)
    const setAuthors = useCallback((sort, search, page = 0, items = []) => {
        setStateAuthors({sort, search, page, items})
    }, [])

    const [menu, setStateMenu] = useState(menuContext)
    const setMenu = useCallback((sort, search, page, items = []) => {
        setStateMenu({sort, search, page, items})
    }, [])

    return (
        <SaveStateContext.Provider value={{
            authors: {...authors, setAuthors},
            menu: {...menu, setMenu},
        }}>
            {children}
        </SaveStateContext.Provider>
    )
}

export default SaveStateProvider
