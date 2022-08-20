import styles from '../styles/CourseCard.module.css';

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
    return (
        <a href="" className={styles.courseTitle}>
            {props.title}
        </a>
    );
};

const CourseAuthor = (props) => {
    return <p className={styles.courseAuthor}>{props.author}</p>;
};

const CourseStars = (props) => {
    let numFullStars = parseInt(props.rating);
    let numHalfStars = props.rating - numFullStars >= 0.4 ? 1 : 0;
    let numEmptyStars = 5 - numFullStars - numHalfStars;
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
                {`(${props.ratingNumber.toLocaleString('en-US')})`}
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
    return (
        <div className={styles.courseCard}>
            <CourseImage image={props.image}></CourseImage>
            <CourseTitle title={props.title}></CourseTitle>
            <CourseAuthor author={props.author}></CourseAuthor>
            <CourseRatings
                rating={props.rating}
                ratingNumber={props.ratings}
            ></CourseRatings>
            <CoursePrice price={props.price}></CoursePrice>
        </div>
    );
};

export default CourseCard;