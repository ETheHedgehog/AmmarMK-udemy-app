import styles from './Header.module.css';
import utilityStyles from '../../styles/Utility.module.css';

const headerImageURL = `${process.env.PUBLIC_URL}/images/header.jpg`;

const Header = () => {
    return (
        <header>
            <div className={styles.headerContainer}>
                <img src={headerImageURL} alt="header banner" />
                <div className={styles.floatCard}>
                    <h1 className={utilityStyles.serif}>
                        Learning that gets you
                    </h1>
                    <p>
                        Skills for your present (and your future). Get started
                        with us.
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
