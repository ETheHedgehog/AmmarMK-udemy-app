import CourseContainer from './CourseContainer';
import styles from '../styles/CourseSection.module.css';

const CourseSection = (props) => {
    return (
        <div className={styles.sectionBox}>
            <h3 className={styles.sectionItem}>{props.title}</h3>
            <p className={styles.sectionItem}>{props.description}</p>
            <a
                href="/"
                className={`${styles.btnOutline} ${styles.sectionItem}`}
            >
                Explore Python
            </a>
            <CourseContainer></CourseContainer>
        </div>
    );
};

export default CourseSection;
