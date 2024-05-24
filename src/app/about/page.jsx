import styles from './about.module.css';

const About = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About Us</h1>
            <p className={styles.purpose}>
                Welcome to Swwwap! Our purpose is to provide a website to help you buy devices or sell one. We strive to offer high-quality content and services that meet the needs of our diverse audience. We care for the environment.
            </p>
            <h2 className={styles.subtitle}>Our Team</h2>
            <p className={styles.team}>
                Our team is composed of dedicated professionals who are passionate about what they do. Meet the creators behind our platform:
            </p>
            <ul className={styles.creators}>
                <li className={styles.creator}>EJ Sabillano - A cool guy who did the backend stuff.</li>
                <li className={styles.creator}>Parker Shane - Another cool guy who did the frontend stuff.</li>
                <li className={styles.creator}>Justin Farin - And another cool guy who did the documentation stuff.</li>
            </ul>
        </div>
    );
};

export default About;
