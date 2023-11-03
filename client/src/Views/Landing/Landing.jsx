import styles from './Landing.module.css';
import dog3 from '../../assets/imgDogs/3.png';
import dog4 from '../../assets/imgDogs/4.png';
import dog6 from '../../assets/imgDogs/6.png';
import dog7 from '../../assets/imgDogs/7.png';
import dog10 from '../../assets/imgDogs/10.png';
import dog11 from '../../assets/imgDogs/11.png';
import dog12 from '../../assets/imgDogs/12.jpg';
import dog13 from '../../assets/imgDogs/13.png';
import dog17 from '../../assets/imgDogs/17.png';
import dog20 from '../../assets/imgDogs/14.png'; 
import dog21 from '../../assets/imgDogs/15.png'; 
import { Link } from 'react-router-dom';

const Landing = () => {
  const images = [dog3, dog4, dog6, dog7, dog10, dog11, dog12, dog13, dog17,dog3, dog4, dog6, dog7, dog10, dog11, dog12, dog13, dog17]; 
  return (
    <div>
      <h1>MaxMas</h1>
      <h2 className={styles.parrafo}>Amor y razas</h2>
  
      <div className={styles.sliderBox}>
        <div className={styles.sliderBoxContainer}>
          
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.sliderItem}`}
            >
              <img src={image} className={styles.sindlerImage} alt={`Dog ${index}`} />
            </div>
          ))}
          
        </div>
      </div>

      <div className={styles.divider}></div>
      <section className={`${styles.homeSection} ${styles.divider}`}>
        <Link to='/create'>
         <h2 className={styles.tituloLink}>Postear una nueva raza de perro</h2>
        </Link>
        
        <p className={styles.parrafotext}>
        Además de brindarte datos detallados sobre las razas de perros ya existentes, nuestra página también te da la oportunidad de contribuir a esta creciente comunidad canina. Si tienes información sobre razas que aún no han sido publicadas en nuestro sitio, te animamos a compartirla. Puedes añadir imágenes, así como datos cruciales como el peso promedio, la altura, el temperamento, el origen histórico y otros aspectos esenciales. Ayúdanos a enriquecer este recurso, permitiendo que más amantes de los perros accedan a información valiosa sobre sus compañeros de cuatro patas.
        </p>
      </section>
      <section className="createSection">
        <Link to='/home'>
          <h2 className={styles.tituloLink}>Razas</h2>
        </Link>
        
        <p className={styles.parrafotext}>
        En nuestra página, te invitamos a explorar un apasionante mundo canino que abarca más de 200 razas diferentes de perros de todo el globo. Desde los majestuosos pastores alemanes hasta los juguetones pomeranios y los intrépidos huskies siberianos, te ofrecemos una exhaustiva colección de información sobre estas diversas razas. Cada raza tiene su propia historia, características únicas y personalidades distintivas, y aquí, te proporcionamos un valioso recurso para conocerlas en profundidad.
        </p>
      </section>
      <div className={styles.horizontalLine}></div>
      <article className={styles.articleContainer}>
        <img src={dog21} alt="perro bonito" className={styles.articleImage} />
        <section className={`${styles.homeSection}`}>
        <h3 className={styles.titulo}>Razas de perros</h3>
        <p className={styles.parrafotext}>
          Hoy en día, muchos de los perros que conoces y amas son producto de la cría selectiva entre individuos con rasgos deseables, ya sean físicos o de comportamiento. Por ejemplo, hace unos 9.500 años, los pueblos antiguos comenzaron a criar perros que eran más capaces de sobrevivir y trabajar en el frío. Estos perros se convertirían en la familia de perros de trineo (incluidas razas como huskies y malamutes) que permanece relativamente sin cambios en la actualidad.
        </p>
      </section>
      <section className={`${styles.razaSection}`}>
        <h3 className={styles.titulo}>Orígenes evolutivos</h3>
        <p className={styles.parrafotext}>
        Todos los perros descienden de una especie de lobo, pero no del lobo gris ( Canis lupus ), como mucha gente supone. De hecho, la evidencia de ADN sugiere que el ancestro lobo de los perros modernos, ahora extinto, era euroasiático . Sin embargo, los científicos todavía están trabajando para comprender exactamente qué especies dieron origen a los perros. 
        </p>
      </section>
        <img src={dog20} alt="dog nice" className={styles.articleImage} />
        
      </article>
    </div>
  );
};

export default Landing;




