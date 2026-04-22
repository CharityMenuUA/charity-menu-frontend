"use client"

import style from './style.module.scss'
import MenuItem from '@/app/components/menu-item/MenuItem'
import {useEffect, useRef, useState} from "react"
import {getMenu} from "@/app/(public)/authors/(chefs-and-menu)/actions"
import SearchInput from "@/app/components/input/SearchInput"
import SelectSort from "@/app/components/input/SelectSort"
import {menuSortValues} from "@/app/(public)/authors/(chefs-and-menu)/sortValues"
import {useMenuContext} from "@/app/providers/save-state/SaveStateItemsProvider"
import useDebouncedCallback from "@/app/components/helpers/useDebouncedCallback"

const Menu = (props) => {
    const {data} = props
    const context = useMenuContext()
    const {items, sort, page: currentPage, search, setMenu} = context

    const menuItems = (!items.length && !search) ? data.menuItems : items
    const [totalPages, setTotalPages] = useState(data.totalPages)
    const sortValues = menuSortValues
    const [isClient, setIsClient] = useState(false)
    const searchRef = useRef('')
    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        setMenu(sort, search, currentPage, menuItems)
    }, [currentPage, menuItems, search, setMenu, sort])

    const getMore = async () => {
        const [sortBy, direction] = sort.split('-')
        getMenu({pageNumber: currentPage + 1, ...(search ? {name: search} : {}), sortBy, direction})
            .then((data) => {
                if (data?.menuItems) {
                    setMenu(sort, search, currentPage + 1, [...menuItems, ...data.menuItems])
                }
            })
            .catch(console.error)
    }

    const fetchWithFilter = useDebouncedCallback((sort, search) => {
        const [sortBy, direction] = sort.split('-')
        getMenu({...(search ? {name: search} : {}), sortBy, direction})
            .then((data) => {
                if (search === searchRef.current && data?.menuItems) {
                    setMenu(sort, search, 0, data.menuItems)
                }
                if (data?.totalPages !== undefined) setTotalPages(data.totalPages)
            })
            .catch(console.error)
    }, 300)

    const changeFilterSort = (sort, search) => {
        searchRef.current = search
        setMenu(sort, search, currentPage, menuItems)
        if (isClient) fetchWithFilter(sort, search)
    }


    const onSearch = (e) => {
        changeFilterSort(sort, e.target.value)
    }

    const onChangeSort = (e) => {
        changeFilterSort(e.target.value, search)
    }

    return (
        <>
            <div className={style.search}>
                {isClient && (
                    <>
                        <SearchInput
                            name={'name'}
                            value={search}
                            placeholder={'Введіть запит'}
                            onChange={onSearch}
                            onClear={() => onSearch({target: {value: ''}})}
                        />
                        <div className={style.sort}>
                            <SelectSort name={"sort"} value={sort} options={sortValues} onChange={onChangeSort}/>
                        </div>
                    </>
                )}
            </div>
            {menuItems.length ? (
                <>
                    <div className={style.menuList} itemScope itemType="https://schema.org/ItemList">
                        {menuItems.map(({menuItem, chef}, key) => (
                            <MenuItem position={key + 1} key={menuItem.id} {...menuItem} chefName={chef.name} chefPhoto={chef.photo}/>
                        ))}
                    </div>
                    {totalPages - 1 > currentPage && (
                        <button className={style.buttonMore} onClick={getMore}>
                            Показати більше
                        </button>
                    )}
                </>
            ) : (
                <div style={{textAlign: "center", margin: "60px 0"}}>
                    Нічого за запитом <b>“{search}”</b>
                </div>
            )}
        </>
    )
}
export default Menu
