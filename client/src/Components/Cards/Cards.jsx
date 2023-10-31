import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';

const Cards = ({ allDogs }) => {
  return (
    <div className={styles.cards}>
      {allDogs.map((d) => (
        <Card
          key={d.id}
          id={d.id}
          image={d.image}
          name={d.name}
          height={d.height}
          weight={d.weight}
          life_span={d.life_span}
          temperaments={d.temperaments}
        />
      ))}
    </div>
  );
};

export default Cards;