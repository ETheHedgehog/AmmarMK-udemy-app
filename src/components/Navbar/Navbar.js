import styles from './Navbar.module.css';
import utilityStyles from '../../styles/Utility.module.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useRef, useState } from 'react';

const shoppingCartURL = `${process.env.PUBLIC_URL}/images/shopping-cart-svgrepo-com.svg`;
const earthGridURL = `${process.env.PUBLIC_URL}/images/earth-grid-svgrepo-com.svg`;
const udemyLogoURL = `${process.env.PUBLIC_URL}/images/Udemy_logo.svg`;

const NavbarLogo = () => {
    return (
        <div className={`${styles.navBarItem} ${styles.navLogo}`}>
            <Link to="/">
                <img
                    src={udemyLogoURL}
                    alt="Logo"
                    className={utilityStyles.logo}
                />
            </Link>
        </div>
    );
};

const NavbarList = () => {
    const navigate = useNavigate();
    const [searchParam, setSearchParam] = useState('');
    const inputRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const changeHandle = (event) => {
        const search = event.target.value;
        setSearchParam(search);
    };

    const clickHandle = (event) => {
        event.preventDefault();
        navigate('/');
        if (inputRef.current.value)
            setSearchParams({
                search: inputRef.current.value,
            });
    };

    return (
        <ul className={styles.navList}>
            <li className={`${styles.navBarItem} ${styles.navBarItem2}`}>
                <Link to="/nothing">Categories</Link>
            </li>
            <li className={`${styles.navBarItem} ${styles.navBarItem30}`}>
                <form action="">
                    <input
                        ref={inputRef}
                        value={searchParam || ''}
                        type="text"
                        placeholder="Search for anything"
                        className={styles.searchInput}
                        onChange={changeHandle}
                    />
                    <button
                        type="submit"
                        className={styles.searchBtn}
                        onClick={clickHandle}
                    >
                        Search
                    </button>
                </form>
            </li>
            <li className={`${styles.navBarItem} ${styles.navBarItem2}`}>
                <Link to="/nothing">Udemy Business</Link>
            </li>
            <li className={`${styles.navBarItem} ${styles.navBarItem2}`}>
                <Link to="/nothing">Teach on Udemy</Link>
            </li>
            <li className={`${styles.navBarItem} ${styles.navBarItem1}`}>
                <Link to="/nothing">
                    <img src={shoppingCartURL} alt="Cart" width="30" />
                </Link>
            </li>
            <li className={`${styles.navBarItem} ${styles.navBarItem2}`}>
                <Link to="/nothing" className={utilityStyles.btnOutline}>
                    Log in
                </Link>
            </li>
            <li className={`${styles.navBarItem} ${styles.navBarItem2}`}>
                <Link to="/nothing" className={utilityStyles.btnFill}>
                    Sign up
                </Link>
            </li>
            <li className={`${styles.navBarItem} ${styles.navBarItem1}`}>
                <Link to="/nothing">
                    <img
                        src={earthGridURL}
                        alt="Language"
                        className={utilityStyles.btnOutline}
                        width="18"
                    />
                </Link>
            </li>
        </ul>
    );
};

const NavbarMenu = () => {
    return (
        <div className={`${styles.navBarItem} ${styles.navMenu}`}>
            <i className="fa-solid fa-bars"></i>
        </div>
    );
};

const Navbar = () => {
    return (
        <nav>
            <div className={styles.navContainer}>
                <NavbarLogo></NavbarLogo>
                <NavbarList></NavbarList>
                <NavbarMenu></NavbarMenu>
            </div>
        </nav>
    );
};

export default Navbar;
