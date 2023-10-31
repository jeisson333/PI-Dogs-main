import React from 'react'
import style from './Card.module.css'
import { Link } from 'react-router-dom';

export const Card = ({id,name,height,weight,life_span,temperaments,image}) => {
  return (
    <div  className={style.card}> 
      <div className={style.cardContent}>
            <h3>{name}</h3>
            <Link to={`/details/${id}`}>
                <img src={image} alt={name} className={style.cardImage} />
            </Link>
      </div>
      <div>
        <h5>Temperaments: {temperaments}</h5>
        <h5>Weight: {weight.metric}</h5>
      </div>
    </div>
  )
}

export default Card;