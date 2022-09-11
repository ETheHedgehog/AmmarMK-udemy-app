import CourseContainer from '../CourseContainer/CourseContainer';
import styles from './CourseSection.module.css';
import utilityStyles from '../../styles/Utility.module.css';
import { Link } from 'react-router-dom';

const CourseSection = (props) => {
    return (
        <div className={styles.sectionBox}>
            <h3 className={styles.sectionItem}>{props.title}</h3>
            <p className={styles.sectionItem}>{props.description}</p>
            <Link
                to="/python"
                className={`${utilityStyles.btnOutline} ${styles.sectionItem}`}
            >
                Explore Python
            </Link>
            <CourseContainer></CourseContainer>
        </div>
    );
};

export default CourseSection;
