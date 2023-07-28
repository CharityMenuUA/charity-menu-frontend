"use client"

import style from './style.module.scss'
import MenuItem from '@/app/components/menu-item/MenuItem'
import {useSwitcherContext} from "@/app/components/switcher/Switcher"
import {useEffect, useState} from "react"
import {getMenu} from "@/app/(public)/chefs/(chefs-and-menu)/actions"
import SearchInput from "@/app/components/input/SearchInput"
import SelectSort from "@/app/components/input/SelectSort"
import {menuSortValues} from "@/app/(public)/chefs/(chefs-and-menu)/sortValues"


const Menu = (props) => {
    const {data} = props
    const {value} = useSwitcherContext()
    const [menuItems, setMenuItems] = useState(data.menuItems)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(data.totalPages)
    const [search, setSearch] = useState('')
    const sortValues = menuSortValues

    const [sort, setSort] = useState(sortValues[0].value)

    useEffect(() => {
        if (value) {
            const [sortBy, direction] = sort.split('-')
            getMenu({...(search ? {name: search} : {}), sortBy, direction}).then((data) => {
                if (data.menuItems) {
                    setMenuItems(data.menuItems)
                }
                setTotalPages(data.totalPages)
                setCurrentPage(0)

            })
        } else {
            setCurrentPage(0)
            setSearch('')
        }
    }, [value, search, sort, data.menuItems])

    if (!value) return

    const getMore = async () => {
        const [sortBy, direction] = sort.split('-')
        getMenu({pageNumber: currentPage + 1, ...(search ? {name: search} : {}), sortBy, direction}).then((data) => {
            if (data.menuItems) {
                console.log(data.menuItems.map((e) => e.menuItem.id))

                setMenuItems((prevState) => [...prevState, ...data.menuItems])
            }
            setCurrentPage(currentPage + 1)
        })
    }

    const onSearch = (e) => {
        setSearch(e.target.value)
    }

    const onChangeSort = (e) => {
        setSort(e.target.value)
    }
    return (
        <>
            <div className={style.search}>
                <SearchInput
                    name={'name'}
                    value={search}
                    placeholder={'Введіть запит'}
                    onChange={onSearch}
                    onClear={() => setSearch('')}
                />
                <div className={style.sort}>
                    <SelectSort name={"sort"} value={sort} options={sortValues} onChange={onChangeSort}/>
                </div>
            </div>
            {menuItems.length ? (
                <>
                    <div className={style.menuList}>
                        {menuItems.map(({menuItem, chef}, key) => (
                            <MenuItem key={key} {...menuItem} chefName={chef.name} chefPhoto={chef.photo}/>
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