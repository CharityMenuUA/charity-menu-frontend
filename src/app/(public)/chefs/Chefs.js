"use client"

import {useSwitcherContext} from "@/app/components/switcher/Switcher"
import style from "@/app/(public)/chefs/style.module.scss"
import ChefItem from "@/app/components/chef-item/ChefItem"
import {useEffect, useState} from "react"
import {getChef} from "@/app/(public)/chefs/actions"
import SearchInput from "@/app/components/input/SearchInput"
import Select from "@/app/components/input/Select"


const Chefs = (props) => {
    const {data} = props
    const {value} = useSwitcherContext()
    const [chefItems, setChefItems] = useState(data.chefs)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(data.totalPages)
    const [search, setSearch] = useState('')

    const sortValues = [
        {name: "За популярністю від більшого", value: 'POPULARITY-DESC'},
        {name: "За популярністю від меншого", value: 'POPULARITY-ASC'},
        {name: "За кількістю пропозицій від більшого", value: 'MENU_ITEMS_NUMBER-DESC'},
        {name: "За кількістю пропозицій від меншого", value: 'MENU_ITEMS_NUMBER-ASC'},
        {name: "За зборами від більшого", value: 'ALIAS-DESC'},
        {name: "За зборами від меншого", value: 'ALIAS-ASC'},
        {name: "За ім'ям А-Я", value: 'NAME-ASC'},
        {name: "За ім'ям Я-А", value: 'NAME-DESC'},
    ]
    const [sort, setSort] = useState(sortValues[0].value)

    useEffect(() => {
        if (!value) {
            const [sortBy, direction] = sort.split('-')
            getChef({...(search ? {name: search} : {}), sortBy, direction}).then((data) => {
                if (data.chefs) {
                    setChefItems(data.chefs)
                }
                setTotalPages(data.totalPages)
                setCurrentPage(0)
            })
        } else {
            if (data.chefs) {
                setChefItems(data.chefs)
            }
            setCurrentPage(0)
            setSearch('')
        }
    }, [value, search, sort, data.chefs])

    if (value) return false

    const getMore = async () => {
        const [sortBy, direction] = sort.split('-')
        getChef({pageNumber: currentPage + 1, ...(search ? {name: search} : {}), sortBy, direction}).then((data) => {
            if (data.chefs) {
                setChefItems((prevState) => [...prevState, ...data.chefs])
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
                    <Select name={"sort"} value={sort} options={sortValues} onChange={onChangeSort}/>
                </div>
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