import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filterTemperamentAction, getDogs,getDogsName,getTemperament, orderDogsAction, paginateDogs} from '../../Redux/Actions/actions';
import Cards from '../../Components/Cards/Cards';
import Navbar from '../../Components/Navbar/Navbar';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const allDogsBackup = useSelector((state) => state.allDogsBackup);
  const allTemperaments = useSelector((state) => state.allTemperament);
  const currentPage = useSelector((state) => state.currentPage);
  const [searchD,setSearchD] = useState("");
  const handleChange = (event) =>{
    event.preventDefault();
    setSearchD(event.target.value);
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    dispatch(getDogsName(searchD))
  }



  useEffect(() => {
    dispatch(getTemperament());
    dispatch(getDogs());
  }, []);

  const paginate = (event) => {
    dispatch(paginateDogs(event.target.name));
  };

  const filterTemperament = (event) => {
    dispatch(filterTemperamentAction(event.target.value));
  };

  const orderDogs = (event) => {
    dispatch(orderDogsAction(event.target.value));
  };
  let cont = []
  for (let index = 0; index < allDogsBackup.length / 8; index++) {
    cont.push(index);   
  }

  return (
    <div className={styles.homeContainer}>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit}/>
      <div className={styles.filtersSection}>
        <h3>Filtros/Ordenamiento: </h3>
        
        <select onChange={orderDogs} name="">
          <option value="Order">Order</option>
          <option value="A">A-Z</option>
          <option value="Z">Z-A</option>
          <option value="Mayor">Peso Mayor a Menor</option>
          <option value="Menor">Peso Menor a Mayor</option>
          <option value="-">ALL</option>
        </select>
        <select onChange={filterTemperament} name="temperament">
          {allTemperaments.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        
        <button onClick={paginate} name='prev'>{"<"}</button>
        {cont.map((c) =>{
          return(
            <button key={c}>{
              c === currentPage? <span className={styles.paginateactual}>{c+1}</span> :c+1             
              
              }</button>

          )
        })}
        <button onClick={paginate} name='next'>{">"}</button>
      </div>
      <Cards allDogs={allDogs} />
      <div className={styles.paginationSection}>
        <button onClick={paginate} name='prev'>{"<"}</button>
        <span>{currentPage+1}</span>
        <button onClick={paginate} name='next'> {">"} </button>
      </div>
      
    </div>
  )
}

export default Home