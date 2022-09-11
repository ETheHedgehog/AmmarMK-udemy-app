import CourseSection from '../CourseSection/CourseSection';
import styles from './FirstSection.module.css';

const FirstSection = (props) => {
    const categories = props.categories.map((category, index) => {
        return (
            <li
                key={index}
                className={`${styles.courseBarItem} ${
                    category === 'Python' && styles.courseBarItemActive
                }`}
            >
                {category}
            </li>
        );
    });

    return (
        <section>
            <div className={styles.mainContainerCol}>
                <h2 className={styles.serif}>{props.headline}</h2>
                <p>{props.description}</p>
                <ul className={styles.courseBar}>{categories}</ul>
                <CourseSection {...props.section}></CourseSection>
            </div>
        </section>
    );
};

export default FirstSection;
