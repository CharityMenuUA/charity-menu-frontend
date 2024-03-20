"use client"
import style from "@/app/styles/not-found.module.scss"
import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {hasError: false}
    }

    static getDerivedStateFromError() {
        return {hasError: true}
    }

    componentDidCatch(error, errorInfo) {
        console.log({error, errorInfo})
    }

    render() {

        if (this.state.hasError) {
            return (
                <div className={style.notFoundPage}>
                    <h2 className={style.title}>
                        Упс..
                    </h2>
                    <div className={style.text}>
                        Щось пішло не так.
                    </div>
                    <button onClick={() => location.reload()} className={style.link}>
                        Оновити сторінку
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
