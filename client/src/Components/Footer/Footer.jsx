import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
    <div className={styles['footer-line']}></div> {/* Línea horizontal en la parte superior */}
      <div className={styles.container}>
        <div className={styles.columns}>
          <div>
            <p>Información de contacto</p>
            <p><a href="mailto:jeissonosorio97@gmail.com">jeissonosorio97@gmail.com</a></p>
            <p><a href="https://www.instagram.com/jf.osorio/">Instagram</a></p>
            <p><a href="https://www.linkedin.com/in/jeissonosorio97/">LinkedIn</a></p>
            <p><a href="https://github.com/jeisson333">GitHub</a></p>
          </div>
          <div>
            <p>Créditos y atribuciones</p>
            <p><a href="https://www.soyhenry.com/">Henry</a></p>
            <p><a href="https://www.thedogapi.com/">The Dog API</a></p>
          </div>
        </div>
        <div>
          <p>© 2023 Jeisson Osorio</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


