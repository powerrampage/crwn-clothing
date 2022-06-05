import { Fragment } from "react"
import { Outlet, Link } from "react-router-dom"
import {ReactComponent as CrwLogo } from "../../assets/crown.svg"

import "./navigation.styles.scss"

export const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link to="/shop" className="nav-link">SHOP</Link>
                    <Link to="/sign-in" className="nav-link">SIGN IN</Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}