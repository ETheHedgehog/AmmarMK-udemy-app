import { Link, useParams } from 'react-router-dom';
import styles from './CoursePage.module.css';
import Footer from '../Footer/Footer';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { DataContext } from '../CourseDataProvider/CourseDataProvider';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { forwardRef, useContext, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const CourseNavBar = ({ course }) => {
    return (
        <nav className={styles.courseNavBar}>
            <div className={styles.courseNavBarContainer}>
                <h1 className={styles.navBarTitle}>{course.title}</h1>
                <div className={styles.navBarStats}>
                    <span className={styles.courseRating}>{course.rating}</span>
                    <span className={styles.courseStars}>
                        <i className="fa-solid fa-star"></i>
                    </span>{' '}
                    <Link to={'/nothing'} className={styles.courseRateCount}>
                        ({course.ratingCount.toLocaleString('en-US')} ratings)
                    </Link>
                    <span className={styles.courseEnrollment}>
                        {course.students.toLocaleString('en-US')} students
                    </span>
                </div>
            </div>
        </nav>
    );
};

const CourseHeader = forwardRef((props, ref) => {
    const { course } = props;
    const courseBreadcrumb = course.breadcrumb.map((item, index) => {
        return (
            <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: '/nothing' }}
                className={styles.courseBreadcrumbLink}
                key={index}
            >
                {item}
            </Breadcrumb.Item>
        );
    });
    const courseAuthors = course.instructors.map((author) => {
        return (
            <Link
                to={'/nothing'}
                className={styles.courseAuthorLink}
                key={author.id}
            >
                {author.name}
                {', '}
            </Link>
        );
    });
    return (
        <div ref={ref} className={styles.headerBackground}>
            <div className={styles.headerContainer}>
                <div className={styles.headerBox}>
                    <Breadcrumb
                        className={`${styles.headerItem} ${styles.courseBreadcrumb}`}
                    >
                        {courseBreadcrumb}
                    </Breadcrumb>
                    <h1
                        className={`${styles.headerItem} ${styles.courseTitle}`}
                    >
                        {course.title}
                    </h1>
                    <p
                        className={`${styles.headerItem} ${styles.courseSummary}`}
                    >
                        {course.subTitle}
                    </p>
                    <div
                        className={`${styles.headerItem} ${styles.courseStats}`}
                    >
                        <span className={styles.courseRating}>
                            {course.rating}
                        </span>
                        <span className={styles.courseStars}>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-stroke"></i>
                        </span>{' '}
                        <Link
                            to={'/nothing'}
                            className={styles.courseRateCount}
                        >
                            ({course.ratingCount.toLocaleString('en-US')}{' '}
                            ratings)
                        </Link>
                        <span className={styles.courseEnrollment}>
                            {course.students.toLocaleString('en-US')} students
                        </span>
                    </div>
                    <div
                        className={`${styles.headerItem} ${styles.courseAuthors}`}
                    >
                        Created by {courseAuthors}
                    </div>
                    <div
                        className={`${styles.headerItem} ${styles.courseMeta}`}
                    >
                        <span>
                            <i className="fa-solid fa-circle-exclamation"></i>
                            Last Updated {course.updated}
                        </span>
                        <span>
                            <i className="fa-solid fa-language"></i>
                            {course.language}
                        </span>
                        <span>
                            <i className="fa-solid fa-closed-captioning"></i>
                            {course.captions}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
});

const CourseNavigation = () => {
    return (
        <div className={styles.navBackground}>
            <div className={styles.navContainer}>
                <div className={styles.navBox}>
                    <span className={styles.navItem}>Overview</span>
                    <span className={styles.navItem}>Curriculum</span>
                    <span className={styles.navItem}>Instructor</span>
                    <span className={styles.navItem}>Reviews</span>
                </div>
            </div>
        </div>
    );
};

const CourseSummary = (props) => {
    const { summary } = props;
    const summaryItems = summary.map((item, index) => {
        return (
            <li className={styles.summaryItem} key={index}>
                <div className={styles.summaryItemBox}>
                    <i className="fa-solid fa-check"></i>
                    <div className={styles.summaryText}>{item}</div>
                </div>
            </li>
        );
    });
    return (
        <div className={`${styles.summaryBox} ${styles.mainItem}`}>
            <h2 className={styles.summaryTitle}>What you'll learn</h2>
            <div className={styles.summaryItems}>
                <ul className={styles.summaryList}>{summaryItems}</ul>
            </div>
        </div>
    );
};

const ContextAwareToggle = forwardRef(
    ({ children, eventKey, callback, isLast }, ref) => {
        const { activeEventKey } = useContext(AccordionContext);
        const decoratedOnClick = useAccordionButton(
            eventKey,
            () => callback && callback(eventKey)
        );
        const isCurrentlyOpen = activeEventKey.includes(eventKey);
        return (
            <div
                type="button"
                className={`${styles.accordionHeader} ${
                    isCurrentlyOpen && styles.headerOpen
                }
            ${isLast && styles.lastHeader}
            `}
                onClick={decoratedOnClick}
                ref={ref}
            >
                {children}
            </div>
        );
    }
);

const ExpandAllBtn = forwardRef(({ eventKeys }, ref) => {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = () => {
        if (eventKeys.length === activeEventKey.length) {
            eventKeys.forEach((key) => {
                setTimeout(() => {
                    ref.current[key].click();
                }, 0);
            });
        } else {
            eventKeys.forEach((key) => {
                if (activeEventKey.includes(key)) return;
                setTimeout(() => {
                    ref.current[key].click();
                }, 1);
            });
        }
    };
    const text =
        eventKeys.length === activeEventKey.length
            ? 'Collapse all sections'
            : 'Expand all sections';
    return (
        <button className={styles.expandAllBtn} onClick={decoratedOnClick}>
            {text}
        </button>
    );
});

const CourseAccordion = forwardRef((props, ref) => {
    const { length, totalLectures, sections } = props.contents;
    const lectureGenerator = (item) => {
        const icon = item.file ? (
            <i className="fa-regular fa-file"></i>
        ) : (
            <i className="fa-solid fa-circle-play"></i>
        );
        const preview = item.preview ? (
            <span className={styles.lecturePreview}>Preview</span>
        ) : (
            <span></span>
        );
        return (
            <li key={item.id} className={styles.lectureItem}>
                {icon}
                <div
                    className={`${styles.lectureTitle} ${
                        item.preview && styles.lecturePreview
                    }`}
                >
                    {item.title}
                </div>
                {preview}
                <span className={styles.lectureDetails}>{item.length}</span>
            </li>
        );
    };
    const sectionsJSX = sections.map((section, index) => {
        return (
            <div key={section.id}>
                <ContextAwareToggle
                    eventKey={index}
                    isLast={section.id === sections.length}
                    ref={(element) => (ref.current[index] = element)}
                >
                    <div className={styles.sectionHeader}>
                        <i className="fa-solid fa-chevron-down"></i>
                        <h3 className={styles.sectionTitle}>{section.title}</h3>
                        <span className={styles.sectionDetails}>
                            {`${section.lectures.length} lectures • ${section.length}`}
                        </span>
                    </div>
                </ContextAwareToggle>
                <Accordion.Collapse eventKey={index}>
                    <ul className={styles.lectureContainer}>
                        {section.lectures.map(lectureGenerator)}
                    </ul>
                </Accordion.Collapse>
            </div>
        );
    });
    return (
        <Accordion defaultActiveKey={[0]} alwaysOpen>
            <div className={styles.sectionSubHeader}>
                <div
                    className={styles.sectionStats}
                >{`${sections.length} sections • ${totalLectures} lectures • ${length} total length`}</div>
                <ExpandAllBtn
                    eventKeys={[...Array(sections.length).keys()]}
                    ref={ref}
                ></ExpandAllBtn>
            </div>
            {sectionsJSX}
        </Accordion>
    );
});

const CourseSections = ({ contents }) => {
    const sectionRefs = useRef([]);
    return (
        <div className={styles.mainItem}>
            <h2 className={styles.sectionIntro}>Course content</h2>
            <CourseAccordion
                contents={contents}
                ref={sectionRefs}
            ></CourseAccordion>
        </div>
    );
};

const CourseRequirements = (props) => {
    const requirements = props.requirements.map((item, index) => {
        return (
            <div key={index} className={styles.requirementBox}>
                <i className="fa-solid fa-circle"></i>
                <li className={styles.requirementsItem}>{item}</li>
            </div>
        );
    });
    return (
        <div className={styles.mainItem}>
            <h2 className={styles.sectionIntro}>Requirements</h2>
            <ul className={styles.requirementsList}>{requirements}</ul>
        </div>
    );
};

const CourseDescription = ({ description, forWho }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const showMore = () => {
        setIsExpanded((old) => {
            return !old;
        });
    };
    const text = isExpanded ? (
        <>
            <span>Show less </span>
            <i className="fa-solid fa-chevron-down"></i>
        </>
    ) : (
        <>
            <span>Show more </span>
            <i className="fa-solid fa-chevron-down"></i>
        </>
    );
    const forWhoJSX = forWho.map((item, index) => {
        return (
            <div key={index} className={styles.forWhoBox}>
                <i className="fa-solid fa-circle"></i>
                <li className={styles.forWhoItem}>{item}</li>
            </div>
        );
    });
    return (
        <div className={styles.mainItem}>
            <h2 className={styles.sectionIntro}>Description</h2>
            <div className={styles.descriptionContainer}>
                <div
                    className={`${styles.descriptionBox} ${
                        isExpanded && styles.expandedDescription
                    }`}
                >
                    <div className={styles.courseDescription}>
                        {description}
                    </div>
                    <h2 className={styles.sectionIntro}>
                        Who is this course for?
                    </h2>
                    <ul className={styles.requirementsList}>{forWhoJSX}</ul>
                </div>
                <button className={styles.showMoreBtn} onClick={showMore}>
                    {text}
                </button>
            </div>
        </div>
    );
};

const InstructorInfo = ({ instructor }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const showMore = () => {
        setIsExpanded((old) => {
            return !old;
        });
    };
    const text = isExpanded ? (
        <>
            <span>Show less </span>
            <i className="fa-solid fa-chevron-down"></i>
        </>
    ) : (
        <>
            <span>Show more </span>
            <i className="fa-solid fa-chevron-down"></i>
        </>
    );
    return (
        <div className={styles.instructorInfo}>
            <div className={styles.instructorName}>
                <Link to={'/nothing'}>{instructor.name}</Link>
            </div>
            <div className={styles.instructorDescription}>
                {instructor.description}
            </div>
            <div className={styles.instructorStatsContainer}>
                <div className={styles.instructorStatsItem}>
                    <img
                        src={`${process.env.PUBLIC_URL}${instructor.picture}`}
                        alt="instructor"
                    ></img>
                </div>
                <ul
                    className={`${styles.instructorStatsItem} ${styles.instructorStats}`}
                >
                    <li className={styles.instructorStat}>
                        <i className="fa-solid fa-star"></i>
                        <span>{instructor.rating} Instructor Rating</span>
                    </li>
                    <li className={styles.instructorStat}>
                        <i className="fa-solid fa-medal"></i>
                        <span>{instructor.reviews} Reviews</span>
                    </li>
                    <li className={styles.instructorStat}>
                        <i className="fa-solid fa-user-group"></i>
                        <span>{instructor.students} Students</span>
                    </li>
                    <li className={styles.instructorStat}>
                        <i className="fa-solid fa-circle-play"></i>
                        <span>{instructor.courses} Courses</span>
                    </li>
                </ul>
            </div>
            <div
                className={`${styles.instructorBox} ${
                    isExpanded && styles.expandedInstructor
                }`}
            >
                <div
                    className={styles.instructorAbout}
                    dangerouslySetInnerHTML={{ __html: instructor.about }}
                ></div>
            </div>
            <button className={styles.showMoreBtn} onClick={showMore}>
                {text}
            </button>
        </div>
    );
};

const CourseInstructors = (props) => {
    const instructors = props.instructors.map((instructor, index) => {
        return (
            <InstructorInfo
                key={index}
                instructor={instructor}
            ></InstructorInfo>
        );
    });
    return (
        <div className={styles.mainItem}>
            <h2 className={styles.sectionIntro}>Instructors</h2>
            <div className={styles.instructorsContainer}>{instructors}</div>
        </div>
    );
};

const RatingStars = ({ count }) => {
    let key = 0;
    let starList = [];
    for (let i = 0; i < count; i++) {
        starList.push(<i key={key++} className="fa-solid fa-star"></i>);
    }
    for (let i = count; i < 5; i++) {
        starList.push(<i key={key++} className="fa-regular fa-star"></i>);
    }
    return <div className={styles.ratingStars}>{starList}</div>;
};

const CourseStars = ({ rating }) => {
    const numFullStars = parseInt(rating);
    const numHalfStars = rating - numFullStars >= 0.4 ? 1 : 0;
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

    return <div className={styles.ratingSummaryStars}>{starList}</div>;
};

const ReviewItem = ({ review, count }) => {
    const [clickedBtn, setClickedBtn] = useState(null);

    const handleClick = (btn) => {
        return () => {
            clickedBtn === btn ? setClickedBtn(null) : setClickedBtn(btn);
        };
    };
    return (
        <div className={styles.reviewBox}>
            <div className={styles.pictureContainer}>
                <div className={styles.profilePicture}>
                    {review.firstName[0] + (review.lastName[0] || '')}
                </div>
            </div>
            <div className={styles.reviewDetails}>
                <div className={styles.reviewName}>
                    {review.firstName} {review.lastName}
                </div>
                <div className={styles.reviewDateAndRate}>
                    <RatingStars count={count}></RatingStars>
                    {review.date}
                </div>
                <div className={styles.reviewContent}>{review.details}</div>
                <div className={styles.reviewSub}>Was this review helpful?</div>
                <div className={styles.reviewStats}>
                    <button
                        onClick={handleClick('like')}
                        className={
                            clickedBtn === 'like'
                                ? styles.rateBtnClicked
                                : styles.rateBtn
                        }
                    >
                        <i className="fa-regular fa-thumbs-up"></i>
                    </button>
                    <button
                        onClick={handleClick('dislike')}
                        className={
                            clickedBtn === 'dislike'
                                ? styles.rateBtnClicked
                                : styles.rateBtn
                        }
                    >
                        <i className="fa-regular fa-thumbs-down"></i>
                    </button>
                    <div className={styles.reportReview}>Report</div>
                </div>
            </div>
        </div>
    );
};

const CourseReviews = ({ reviews, rating }) => {
    const [seeMore, setSeeMore] = useState({ itemsToShow: 7, expanded: false });
    const [selectedRating, setSelectedRating] = useState('0');
    const [searchParams, setSearchParams] = useState('');
    const inputRef = useRef(null);
    const searchHandle = (event) => {
        event.preventDefault();
        setSearchParams(inputRef.current.value);
    };
    const changeHandler = (element) => {
        setSelectedRating(element.target.value);
    };
    const clickHandler = () => {
        seeMore.itemsToShow === 7
            ? setSeeMore({ itemsToShow: 20, expanded: true })
            : setSeeMore({ itemsToShow: 7, expanded: false });
    };
    let totalRatings = 0;
    for (let rating in reviews) {
        totalRatings += reviews[rating].length;
    }
    const ratings = Object.entries(reviews)
        .reverse()
        .map(([rating, reviewsArray], index) => {
            const ratingPercent = parseInt(
                (100 * reviewsArray.length) / totalRatings
            );
            const count = parseInt(rating);
            return (
                <div key={index} className={styles.ratingRow}>
                    <div className={styles.ratingGauge}>
                        <div
                            className={styles.ratingGaugeFill}
                            style={{ width: ratingPercent + '%' }}
                        ></div>
                    </div>
                    <RatingStars count={count}></RatingStars>
                    <div className={styles.ratingPercent}>{ratingPercent}%</div>
                </div>
            );
        });
    let key = 0;
    const fullReviewList = Object.entries(reviews)
        .map(([rating, reviewsArray]) => {
            if (selectedRating === '0' || rating === selectedRating)
                return reviewsArray.map((review) => {
                    if (
                        !searchParams ||
                        review.details
                            .toLowerCase()
                            .includes(searchParams.toLowerCase())
                    )
                        return (
                            <ReviewItem
                                key={key++}
                                review={review}
                                count={rating}
                            ></ReviewItem>
                        );
                    return null;
                });
            return [];
        })
        .reverse()
        .flat(1)
        .filter((x) => x !== null);
    const reviewList = fullReviewList.slice(0, seeMore.itemsToShow);
    return (
        <>
            <div className={styles.mainItem}>
                <h2 className={styles.sectionIntro}>Student feedback</h2>
                <div className={styles.feedbackSummaryContainer}>
                    <div className={styles.ratingSummary}>
                        <div className={styles.ratingSummaryRate}>{rating}</div>
                        <CourseStars rating={rating}></CourseStars>
                        <div className={styles.ratingSummarySub}>
                            Course Rating
                        </div>
                    </div>
                    <div className={styles.ratingDetails}>{ratings}</div>
                </div>
            </div>
            <div className={styles.mainItem}>
                <h2 className={styles.sectionIntro}>Reviews</h2>
                <div className={styles.reviewsContainer}>
                    <form action="" className={styles.filterContainer}>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search reviews"
                            className={styles.searchReviews}
                        ></input>
                        <button
                            type="submit"
                            className={styles.searchReviewsBtn}
                            onClick={searchHandle}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <select
                            className={styles.searchRating}
                            onChange={changeHandler}
                        >
                            <option value="0">All Ratings</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>
                    </form>
                    {reviewList}
                    <button
                        className={styles.seeMoreBtn}
                        onClick={clickHandler}
                        style={{
                            display: fullReviewList.length <= 7 && 'none',
                        }}
                    >
                        {seeMore.expanded
                            ? 'See less reviews'
                            : 'See more reviews'}
                    </button>
                </div>
            </div>
        </>
    );
};

const FloatingCourseCard = ({ course, inView }) => {
    const hours = course.incentives.hours ? (
        <li className={styles.incentiveItem}>
            <i className="fa-solid fa-display"></i>
            {course.incentives.hours} hour
            {course.incentives.hours === 1 ? ' ' : 's '}
            on-demand video
        </li>
    ) : (
        <></>
    );
    const articles = course.incentives.articles ? (
        <li className={styles.incentiveItem}>
            <i className="fa-regular fa-file"></i>
            {course.incentives.articles} article
            {course.incentives.articles === 1 ? '' : 's'}
        </li>
    ) : (
        <></>
    );
    const resources = course.incentives.resources ? (
        <li className={styles.incentiveItem}>
            <i className="fa-solid fa-download"></i>
            {course.incentives.resources} resource
            {course.incentives.resources === 1 ? '' : 's'}
        </li>
    ) : (
        <></>
    );
    const lifetimeAccess = course.incentives.lifetimeAccess ? (
        <li className={styles.incentiveItem}>
            <i className="fa-solid fa-infinity"></i> Full lifetime access
        </li>
    ) : (
        <></>
    );
    const mobileAccess = course.incentives.mobileAccess ? (
        <li className={styles.incentiveItem}>
            <i className="fa-solid fa-mobile-screen"></i> Access on mobile and
            TV
        </li>
    ) : (
        <></>
    );
    const certificate = course.incentives.certificate ? (
        <li className={styles.incentiveItem}>
            <i className="fa-solid fa-trophy"></i> Certificate of completion
        </li>
    ) : (
        <></>
    );
    return (
        <div
            className={`${styles.floatingCard} ${
                !inView && styles.floatingCardSticky
            }`}
        >
            <img
                src={`${process.env.PUBLIC_URL}${course.image}`}
                alt={course.title}
                className={styles.floatingImage}
                style={{ display: !inView && 'none' }}
            />
            <div className={styles.floatingTop}>
                <span className={styles.coursePrice}>${course.price}</span>
                <div className={styles.addToCartBtn}>Add to cart</div>
                <div className={styles.buyNowBtn}>Buy now</div>
                <span className={styles.moneyGuarantee}>
                    30-Day Money-Back Guarantee
                </span>
                <span className={styles.courseIncentiveTitle}>
                    This course includes:
                </span>
                <ul className={styles.courseIncentive}>
                    {hours}
                    {articles}
                    {resources}
                    {lifetimeAccess}
                    {mobileAccess}
                    {certificate}
                </ul>
                <div className={styles.buyOptions}>
                    <div>Share</div>
                    <div>Gift this course</div>
                    <div>Apply Coupon</div>
                </div>
            </div>
            <div className={styles.floatingBottom}>
                <div className={styles.businessTitle}>
                    Training 5 or more people?
                </div>
                <div className={styles.businessDesc}>
                    Get your team access to 17,000+ top Udemy courses anytime,
                    anywhere.
                </div>
                <div className={styles.businessBtn}>Try Udemy Business</div>
            </div>
        </div>
    );
};

const MainCourseContent = (props) => {
    const { course, inView } = props;
    return (
        <div className={styles.mainContainer}>
            <div className={styles.mainBox}>
                <CourseSummary summary={course.summary}></CourseSummary>
                <CourseSections contents={course.contents}></CourseSections>
                <CourseRequirements
                    requirements={course.requirements}
                ></CourseRequirements>
                <CourseDescription
                    description={course.description}
                    forWho={course.forWho}
                ></CourseDescription>
                <CourseInstructors
                    instructors={course.instructors}
                ></CourseInstructors>
                <CourseReviews
                    reviews={course.feedback}
                    rating={course.rating}
                ></CourseReviews>
            </div>

            <FloatingCourseCard
                course={course}
                inView={inView}
            ></FloatingCourseCard>
        </div>
    );
};

const CoursePage = () => {
    const { ref, inView } = useInView({
        rootMargin: '-48px',
        threshold: 0.2,
    });
    const coursesData = DataContext();
    const { courseId } = useParams();
    const course = coursesData.courses.find(
        (course) => course.id === parseInt(courseId)
    );
    if (coursesData.isLoading) return <h1>Hi</h1>;
    return (
        <>
            <CourseNavBar course={course}></CourseNavBar>
            <CourseHeader course={course} ref={ref}></CourseHeader>
            <CourseNavigation></CourseNavigation>
            <MainCourseContent
                course={course}
                inView={inView}
            ></MainCourseContent>
            <Footer></Footer>
        </>
    );
};

export default CoursePage;
