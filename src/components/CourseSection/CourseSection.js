import CourseContainer from '../CourseContainer/CourseContainer';
import styles from './CourseSection.module.css';
import utilityStyles from '../../styles/Utility.module.css';

const CourseSection = (props) => {
    return (
        <div className={styles.sectionBox}>
            <h3 className={styles.sectionItem}>{props.title}</h3>
            <p className={styles.sectionItem}>{props.description}</p>
            <a
                href="/"
                className={`${utilityStyles.btnOutline} ${styles.sectionItem}`}
            >
                Explore Python
            </a>
            <CourseContainer></CourseContainer>
        </div>
    );
};

export default CourseSection;
