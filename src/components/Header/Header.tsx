import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import NextLink from 'next/link';
import { FaReact, FaBars } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 426 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.logoIcon}>
        <FaReact size={32} />
      </div>
      <nav className={styles.navigation}>
        <NextLink href="/" passHref>
          <span className={styles.navLink}>Home</span>
        </NextLink>
        <NextLink href="/about" passHref>
          <span className={styles.navLink}>About</span>
        </NextLink>
        <NextLink href="/projects" passHref>
          <span className={styles.navLink}>Projects</span>
        </NextLink>
        <NextLink href="/contact" passHref>
          <span className={styles.navLink}>Contact</span>
        </NextLink>
      </nav>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <FaBars size={24} />
      </div>
      {menuOpen && (
        <div
          className={styles.dropdown}
          style={{ display: menuOpen ? 'block' : 'none' }}
        >
          <NextLink href="/" passHref>
            <span className={styles.navLink} onClick={toggleMenu}>
              Home
            </span>
          </NextLink>
          <NextLink href="/about" passHref>
            <span className={styles.navLink} onClick={toggleMenu}>
              About
            </span>
          </NextLink>
          <NextLink href="/projects" passHref>
            <span className={styles.navLink} onClick={toggleMenu}>
              Projects
            </span>
          </NextLink>
          <NextLink href="/contact" passHref>
            <span className={styles.navLink} onClick={toggleMenu}>
              Contact
            </span>
          </NextLink>
        </div>
      )}
    </header>
  );
};

export default Header;
