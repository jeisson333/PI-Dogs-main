import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Details.module.css';

const Detail = () => {
  const { id } = useParams();
  const [dogs, setDogs] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/dogs/${id}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.name) {
          setDogs(data);
        } else {
          window.alert('No hay personajes con ese ID');
        }
      });
  }, [id]);

  return (
    <div>
    <div className={styles.detailsContainer}>
        <div className={styles.infoContainer}>
          <h2>Breed: {dogs?.name}</h2>
          <div>
            <h4>Height: </h4> {dogs?.height?.metric}
          </div>
          <div>
            <h4>Weight: </h4> {dogs?.weight?.metric}
          </div>
          <div>
            <h4>Life Span: </h4> {dogs?.life_span}
          </div>
          <div className={styles.descriptionContainer}>
            <h4>Temperament:</h4>
            {/* Limpia las etiquetas HTML de la descripción antes de renderizarla */}
            {dogs?.temperament}
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={dogs?.image}
            alt={dogs?.name}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
