import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperament, postDog } from '../../Redux/Actions/actions';
import styles from './Create.module.css';

const Create = () => {
  const dispatch = useDispatch();
  const allTemperament = useSelector((state) => state.allTemperament);

  useEffect(() => {
    dispatch(getTemperament());
  }, [])

  const initialState = {
    name: '',
    numMinHei: "",
    numMaxHei: "",
    height: {},
    numMinWei: "",
    numMaxWei: "",
    weight: {},
    life_span: "",
    temperament: [],
    image: ""
  };
 
  const [formCleared, setFormCleared] = useState(false);
  const [state, setState] = useState(initialState)
  const resetForm = () => {
    setState(initialState);
    setFormCleared(true);
  };
  const [errors, setErrors] = useState({
    name: "Formulario incompleto!",
    numMinHei: "Formulario incompleto!",
    numMinWei: "Formulario incompleto!",
    life_span: "Formulario incompleto!",
    temperament: "Formulario incompleto!",
    image: "Formulario incompleto!"
  });
 
  const validate = (state, name) => {
    const validationRegex = {
      name: /^[A-Za-z\s']+$/,
      numMinHei: /^(0|1[0-9][0-9]|200)$/,
      numMaxHei: /^(0|1[0-9][0-9]|200)$/,
      numMinWei: /^(0|1[0-9][0-9]|100)$/,
      numMaxWei: /^(0|1[0-9][0-9]|100)$/,
      life_span: /^\d+$/,
      temperament: /^.+$/,
      image: /^(http|https):\/\/[^\s$.?#].[^\s]*$/,
    };

    if (name in validationRegex) {
      const regex = validationRegex[name];
      if (!regex.test(state[name])) {
        setErrors({ ...errors, [name]: `Campo ${name} inválido` });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }

    if (name === "numMinHei" || name === "numMaxHei") {
      if (state.numMinHei > state.numMaxHei) {
        setErrors({
          ...errors,
          numMinHei: "Altura mínima no puede ser mayor que la altura máxima",
          numMaxHei: "Altura máxima no puede ser menor que la altura mínima",
        });
      } else {
        setErrors({
          ...errors,
          numMinHei: "",
          numMaxHei: "",
        });
      }
    }

    if (name === "numMinWei" || name === "numMaxWei") {

      if (state.numMinWei > state.numMaxWei) {
        setErrors({
          ...errors,
          numMinWei: "Peso mínimo no puede ser mayor que el peso máximo",
          numMaxWei: "Peso máximo no puede ser menor que el peso mínimo",
        });
      } else {
        setErrors({
          ...errors,
          numMinWei: "",
          numMaxWei: "",
        });
      }
    }
  };
 
  const removeTemperament = (event)=>{
    event.preventDefault();
    const removedTemperament = event.target.value;
    const updatedTemperament = state.temperament.filter(e => e !== removedTemperament);
    setState({
      ...state,
      temperament: updatedTemperament,
    });
    
  }
  const sinCopi = new Set(state.temperament)
    state.temperament = [...sinCopi]
  useEffect (()=>{

  },[state.temperament])
 

  const handleChange = (event) => {
    
    if (event.target.name === "temperament") {
      
      setState({
        ...state,
        temperament: [...state.temperament, event.target.value],
      });
      
    }
    else {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    }
    validate(
      {
        ...state,
        [event.target.name]: event.target.value,
      },
      event.target.name
    );
  };


  const disableFunction = () => {
    let disabledAux = 0;
    for (let error in errors) {
      if (errors.hasOwnProperty(error)) {
        if (errors[error] !== "") {
          disabledAux++;
        }
      }
    }
    if (disabledAux > 0) {
      return true;
    }
    else return false;
  }

  const temperamentM = allTemperament.map((t) => t.name)


  state.height = { metric: `${state.numMinHei} - ${state.numMaxHei}` };
  state.weight = { metric: `${state.numMinWei} - ${state.numMaxWei}` };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postDog(state));
    resetForm();
    setFormCleared(false);
    setErrors({
      ...errors,
      numMinHei: "Formulario incompleto!",
      numMinWei: "Formulario incompleto!",
      life_span: "Formulario incompleto!",
      temperament: "Formulario incompleto!",
      image: "Formulario incompleto!"
    });
  }

  

  const miSet = new Set();
  for (let error in errors) {
    if (errors.hasOwnProperty(error)) {
      miSet.add(errors[error]);
    }
  }
  
  return (
    <div className={styles['form-container']}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="" className={styles['form-label']}>Name: </label>
        <input name='name' onChange={handleChange} type="text" value={formCleared ? '' : state.name} className={styles['form-input']} />
        <label htmlFor="" className={styles['form-label']}>Height: (CM)</label>
        <input name='numMinHei' onChange={handleChange} type="text" value={formCleared ? '' : state.numMinHei} placeholder="Min Num" className={styles['form-inputnum']} />
        <input name='numMaxHei' onChange={handleChange} type="text" value={formCleared ? '' : state.numMaxHei} placeholder="Max Num" className={styles['form-inputnum']} />
        <label htmlFor="" className={styles['form-label']}>Weight: (KG)</label>
        <input name='numMinWei' onChange={handleChange} type="text" value={formCleared ? '' : state.numMinWei} placeholder="Min Num" className={styles['form-inputnum']} />
        <input name='numMaxWei' onChange={handleChange} type="text" value={formCleared ? '' : state.numMaxWei} placeholder="Max Num" className={styles['form-inputnum']} />
        <label htmlFor="" className={styles['form-label']}>Life Span:</label>
        <input name='life_span' onChange={handleChange} type="text" value={formCleared ? '' : state.life_span} className={styles['form-input']} />
        <label className={styles['form-label']}>Temperament: 
         {
          state.temperament.map((e,i)=>{
          return(
            <button className={styles.buttonRemove} onClick={removeTemperament} key={i} value={e}>
              {e}
            </button>
          )
  
         })
         }</label>
        <select name='temperament' onChange={handleChange} className={styles['form-select']}>
          {temperamentM.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <label htmlFor="" className={styles['form-label']}>Image: </label>
        <input name='image' onChange={handleChange} type="text" value={formCleared ? '' : state.image} className={styles['form-input']} />
        <p className={styles['error-message']}>{Array.from(miSet).join(", ")}</p>
        <input disabled={disableFunction()} type="submit" className={styles['form-button']} />
      </form>
    </div>
  )
}

export default Create
