import style from "./policy.module.scss"

const PolicyPage = () => {
    return (
        <div className={style.policyPage}>
            <div className={style.policyPage_inner}>
                <div className={style.policyPage_head}>
                    <h1>Оферта</h1>
                </div>

                <div className={style.policyPage_cont}>
                    <h2>
                        H2. Title here
                    </h2>
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page
                        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                        distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it
                        look like
                        readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as
                        their default model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites
                        still in
                        their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on
                        purpose (injected humour and the like).
                    </p>
                    <h3>
                        H3. Title here
                    </h3>
                    <ol>
                        <li>distracted by the readable</li>

                        <li>established</li>
                        <li>distracted by the readable</li>
                    </ol>
                    <p>
                        <strong>It is a long established fact</strong> that a reader will be distracted by the readable
                        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                        more-or-less normal distribution of letters, as opposed to using &apos;Content here, content
                        here&apos;,
                        making it look like readable English. Many desktop publishing packages and web page editors now
                        use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will
                        uncover many
                        web sites still in their infancy. Various versions have evolved over the years, sometimes by
                        accident, sometimes on purpose (injected humour and the like).
                    </p>
                    <h2>
                        <i>H2. Title here</i>
                    </h2>
                    <ul>
                        <li>established</li>
                        <li>distracted by the readable</li>
                    </ul>
                    <span>Test</span>
                    <p>
                        <a href="#">It is a long established fact that a reader</a> will be distracted by the readable
                        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                        more-or-less normal distribution of letters, as opposed to using &apos;Content here, content
                        here&apos;,
                        making it look like readable English. Many desktop publishing packages and web page editors now
                        use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will
                        uncover many
                        web sites still in their infancy. Various versions have evolved over the years, sometimes by
                        accident, sometimes on purpose (injected humour and the like).
                    </p>
                </div>
            </div>
        </div>
    )
}
export default PolicyPage
