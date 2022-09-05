import styles from './Footer.module.css';
import utilityStyles from '../../styles/Utility.module.css';
import { Link } from 'react-router-dom';

const earthGridURL = `${process.env.PUBLIC_URL}/images/earth-grid-svgrepo-com.svg`;
const udemyLogoURL = `${process.env.PUBLIC_URL}/images/logo-udemy-inverted.svg`;

const FooterItemColumn = ({ children }) => {
    return (
        <div className={`${utilityStyles.containerCol} ${styles.footerItem}`}>
            {children}
        </div>
    );
};

const footerLinkGenerator = (item, index) => {
    return (
        <Link to="/nothing" className={styles.footerLink} key={index}>
            {item}
        </Link>
    );
};

const footerColumnGenerator = (items, index) => {
    return (
        <FooterItemColumn key={index}>
            {items.map(footerLinkGenerator)}
        </FooterItemColumn>
    );
};

const FooterContainer = () => {
    const urlList = [
        [
            'Udemy Business',
            'Teach on Udemy',
            'Get the app',
            'About us',
            'Contact us',
        ],
        ['Careers', 'Blog', 'Help and Support', 'Affiliate', 'Investors'],
        [
            'Terms',
            'Privacy policy',
            'Cookie settings',
            'Sitemap',
            'Accessibility statement',
        ],
    ].map(footerColumnGenerator);

    return (
        <div className={styles.footerContainer}>
            {urlList}
            <div
                className={`${utilityStyles.itemGrow} ${utilityStyles.itemShrink}`}
            ></div>
            <div className={`${styles.footerItem} ${styles.footerItemBtn}`}>
                <div className={styles.footerBtn}>
                    <img src={earthGridURL} alt="Language" width="18" />
                    <span>English</span>
                </div>
            </div>
        </div>
    );
};

const CopyrigthContainer = () => {
    return (
        <div
            className={`${styles.copyrightContainer} ${utilityStyles.centerItems}`}
        >
            <img
                src={udemyLogoURL}
                alt="Udemy Logo"
                className={`${utilityStyles.logo} ${styles.copyrightItem}`}
            />
            <div className={utilityStyles.itemGrow}></div>
            <p className={styles.copyrightItem}>© 2022 Udemy, Inc.</p>
        </div>
    );
};

const Footer = () => {
    return (
        <footer>
            <FooterContainer></FooterContainer>
            <CopyrigthContainer></CopyrigthContainer>
        </footer>
    );
};

export default Footer;
