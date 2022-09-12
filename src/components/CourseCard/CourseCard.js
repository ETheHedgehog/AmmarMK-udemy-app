import styles from './CourseCard.module.css';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CourseImage = (props) => {
    return (
        <img
            src={`${process.env.PUBLIC_URL}${props.image}`}
            alt=""
            className={styles.courseImg}
        />
    );
};

const CourseTitle = (props) => {
    return <div className={styles.courseTitle}>{props.title}</div>;
};

const CourseAuthor = (props) => {
    return (
        <p className={styles.courseAuthor}>
            {props.author.map((author) => {
                return author.name + ',';
            })}
        </p>
    );
};

const CourseStars = (props) => {
    const numFullStars = parseInt(props.rating);
    const numHalfStars = props.rating - numFullStars >= 0.4 ? 1 : 0;
    const numEmptyStars = 5 - numFullStars - numHalfStars;
    let key = 1;
    let starList = [];
    for (let i = 0; i < numFullStars; i++) {
        starList.push(<i key={key++} className="fa-solid fa-star"></i>);
    }
    if (numHalfStars === 1) {
        starList.push(
            <i key={key++} className="fa-solid fa-star-half-stroke"></i>
        );
    }
    for (let i = 0; i < numEmptyStars; i++) {
        starList.push(<i key={key++} className="fa-regular fa-star"></i>);
    }

    return <span className={styles.rating}>{starList}</span>;
};

const CourseRatings = (props) => {
    return (
        <div>
            <span className={styles.rating}>{props.rating}</span>
            <CourseStars rating={props.rating}></CourseStars>
            <span className={styles.ratingNumbers}>
                {`(${props.ratingCount.toLocaleString('en-US')})`}
            </span>
        </div>
    );
};

const CoursePrice = (props) => {
    return (
        <div className={styles.coursePrice}> ${props.price.toString()} </div>
    );
};

const CourseCard = (props) => {
    if (props.loading) {
        return (
            <div className={styles.courseCard} style={{ width: 240 }}>
                <Skeleton height={135} />
                <Skeleton count={1} height="2rem" />
                <Skeleton count={1} height="0.85rem" />
                <Skeleton count={1} height="0.85rem" />
                <Skeleton count={1} width={50} />
            </div>
        );
    }
    return (
        <Link to={`courses/${props.id}`} className={styles.courseCard}>
            <CourseImage image={props.image}></CourseImage>
            <CourseTitle title={props.title} id={props.id}></CourseTitle>
            <CourseAuthor author={props.instructors}></CourseAuthor>
            <CourseRatings
                rating={props.rating}
                ratingCount={props.ratingCount}
            ></CourseRatings>
            <CoursePrice price={props.price}></CoursePrice>
        </Link>
    );
};

export default CourseCard;
