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
            {/* <div class="footer-container">
                <div class="container-col footer-item">
                    <a href="/" class="footer-link">
                        Udemy Business
                    </a>
                    <a href="/" class="footer-link">
                        Teach on Udemy
                    </a>
                    <a href="/" class="footer-link">
                        Get the app
                    </a>
                    <a href="/" class="footer-link">
                        About us
                    </a>
                    <a href="/" class="footer-link">
                        Contact us
                    </a>
                </div>
                <div class="container-col footer-item">
                    <a href="/" class="footer-link">
                        Careers
                    </a>
                    <a href="/" class="footer-link">
                        Blog
                    </a>
                    <a href="/" class="footer-link">
                        Help and Support
                    </a>
                    <a href="/" class="footer-link">
                        Affiliate
                    </a>
                    <a href="/" class="footer-link">
                        Investors
                    </a>
                </div>
                <div class="container-col footer-item">
                    <a href="/" class="footer-link">
                        Terms
                    </a>
                    <a href="/" class="footer-link">
                        Privacy policy
                    </a>
                    <a href="/" class="footer-link">
                        Cookie settings
                    </a>
                    <a href="/" class="footer-link">
                        Sitemap
                    </a>
                    <a href="/" class="footer-link">
                        Accessibility statement
                    </a>
                </div>
                <div class="item-grow item-shrink"></div>
                <div class="footer-item footer-item-btn">
                    <div class="footer-btn">
                        <img
                            src="images/earth-grid-svgrepo-com.svg"
                            alt="Language"
                            width="18"
                        />
                        <span>English</span>
                    </div>
                </div>
            </div> */}
            <FooterContainer></FooterContainer>
            <CopyrigthContainer></CopyrigthContainer>
        </footer>
    );
};

export default Footer;
