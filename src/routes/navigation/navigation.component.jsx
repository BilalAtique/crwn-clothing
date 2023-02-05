import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss"

const Navigation = () => {
    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="links-container">
                    <Link to="/shop" className="nav-link" >Shop</Link>
                </div>
                <div className="links-container">
                    <Link to="/signIn" className="nav-link" >Sign In</Link>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
