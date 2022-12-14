import FirstSection from '../FirstSection/FirstSection';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const HomePage = () => {
    return (
        <>
            <Header></Header>
            <FirstSection
                headline="A broad selection of courses"
                description="Choose from 185,000 online video courses with new additions
                published every month"
                categories={[
                    'Python',
                    'Excel',
                    'Web Development',
                    'JavaScript',
                    'Data Science',
                    'AWS Certification',
                    'Drawing',
                ]}
                section={{
                    title: 'Expand your career opportunities with Python',
                    description:
                        'Take one of Udemy’s range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to ...',
                }}
            ></FirstSection>
            <Footer></Footer>
        </>
    );
};

export default HomePage;
