"use client"

import style from "@/app/(public)/authors/(chefs-and-menu)/style.module.scss"
import ChefItem from "@/app/components/chef-item/ChefItem"
import {useEffect, useRef, useState} from "react"
import {getChef} from "@/app/(public)/authors/(chefs-and-menu)/actions"
import SearchInput from "@/app/components/input/SearchInput"
import SelectSort from "@/app/components/input/SelectSort"
import {chefsSortValues} from "@/app/(public)/authors/(chefs-and-menu)/sortValues"
import {useAuthorsContext} from "@/app/providers/save-state/SaveStateItemsProvider"


const Chefs = (props) => {
    const {data} = props
    const context = useAuthorsContext()
    const {items, sort, page: currentPage, search, setAuthors} = context

    const chefItems = (!items.length && !search) ? data.chefs : items
    const [totalPages, setTotalPages] = useState(data.totalPages)
    const sortValues = chefsSortValues
    const [isClient, setIsClient] = useState(false)
    const searchRef = useRef('')
    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        setAuthors(sort, search, currentPage, chefItems, 'first')
    }, [currentPage, chefItems, search, setAuthors, sort])


    const getMore = async () => {
        const [sortBy, direction] = sort.split('-')
        getChef({pageNumber: currentPage + 1, ...(search ? {name: search} : {}), sortBy, direction}).then((data) => {
            if (data.chefs) {
                setAuthors(sort, search, currentPage + 1, [...chefItems, ...data.chefs], 'setCurrentPage')
            }
        })
    }


    const changeFilterSort = (sort, search) => {
        const [sortBy, direction] = sort.split('-')
        searchRef.current = search
        setAuthors(sort, search, currentPage, chefItems)
        if (isClient) getChef({...(search ? {name: search} : {}), sortBy, direction}).then((data) => {
            if (search === searchRef.current) {
                setAuthors(sort, search, 0, data.chefs, 'updateMenu')
            }
            setTotalPages(data.totalPages)
        })
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
            {chefItems.length ? (
                <>
                    <div className={style.chefList}>
                        {chefItems.map((chef) => (
                            <ChefItem key={chef.id} {...chef}/>
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
export default Chefs
