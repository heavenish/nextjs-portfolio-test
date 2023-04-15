import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Slider from '../components/Slider/Slider';
import styles from '../styles//Main.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Jungro Lee</title>
        <meta
          name="description"
          content="Personal website created and designed by Jungro Lee, assisted by ChatGPT"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.welcomeSection}>
        <img
          src="https://res.cloudinary.com/dwr2brbx5/image/upload/v1681485322/convo_qamw2w.jpg"
          alt="main"
          className={`${styles.image} ${styles.image1}`}
        />
        {/* <img
          src="https://res.cloudinary.com/dwr2brbx5/image/upload/v1681485322/pets_bobsjf.jpg"
          alt="Pets"
          className={`${styles.image} ${styles.image2}`}
        />
        <img
          src="https://res.cloudinary.com/dwr2brbx5/image/upload/v1681485321/dining_rtyghb.jpg"
          alt="Dining"
          className={`${styles.image} ${styles.image3}`}
        />
        <img
          src="https://res.cloudinary.com/dwr2brbx5/image/upload/v1681485322/snowboard_wbrasq.jpg"
          alt="snowboard"
          className={`${styles.image} ${styles.image4}`}
        />
        <img
          src="https://res.cloudinary.com/dwr2brbx5/image/upload/v1681485322/hiking-spring_cy8qhc.jpg"
          alt="Hiking"
          className={`${styles.image} ${styles.image5}`}
        />
        <img
          src="https://res.cloudinary.com/dwr2brbx5/image/upload/v1681485322/selfie_ypl3tj.jpg"
          alt="Selfie"
          className={`${styles.image} ${styles.image6}`}
        />
        <img
          src="https://res.cloudinary.com/dwr2brbx5/image/upload/v1681485322/volunteer_wg0ghd.jpg"
          alt="Volunteer"
          className={`${styles.image} ${styles.image7}`}
        /> */}
        <h1 className={styles.welcomeHeadline}>Welcome</h1>
        <p className={styles.introText}>
          &ldquo;Hi there! I&rsquo;m{' '}
          <Link href="/about" target="_self">
            <span className={styles.link}>Jungro</span>
          </Link>
          , a passionate software engineer with a deep interest in full-stack
          development, artificial intelligence, and innovative technology. I
          enjoy solving complex problems and creating intuitive, efficient, and
          user-friendly applications. This website was meticulously crafted from
          ground up using{' '}
          <Link href="https://nextjs.org/" target="_blank">
            <span className={styles.link} rel="noopener noreferrer">
              Next.js
            </span>
          </Link>
          , showcasing my skills and dedication to creating modern and
          high-performance web applications. My goal is to positively impact the
          lives of others through my work. Feel free to explore my website and
          learn more about my projects and experiences. -ChatGPT&rdquo;
          <br />
          <span className={styles.author}>-Jungro Lee</span>
        </p>
      </div>
      <p className={styles.paragraphText}>
        This website was embarked on as an exciting challenge and learning
        experience starting from 04/07/23. After being introduced to Next.js a
        month ago, I was inspired to create my own portfolio website that
        showcases my talent, skills, and passion for web and app development.
        Serendipity led me to ChatGPT, which I decided to incorporate and
        utilize to my first personal deployed project. I&rsquo;m always eager to
        learn from others and collaborate on exciting projects, so please
        don&rsquo;t hesitate to{' '}
        <Link href="/contact" target="_self">
          <span className={styles.link}>reach out </span>
        </Link>
        if you&rsquo;d like to connect.
      </p>
      <p className={styles.scrollText}>
        In the meantime, check out my{' '}
        <Link href="/projects" target="_self">
          <span className={styles.link}>Projects</span>
        </Link>
        !
      </p>
      <div className={styles.sliderSection} id="slider">
        <Slider />
      </div>
    </Layout>
  );
}
