import { GET_TEMPERAMENT, GET_DOGS, PAGINATE, FILTER, ORDER, GET_DOG_NAME, GET_DOGSDB, GET_DOGSAPI } from "../Actions/action-types";

const initialState = {
  allDogs: [],
  allTemperament: [],
  allDogsBackup: [],
  dogsApi: [],
  dogsDb:[],
  currentPage: 0,
  dogsFiltered: [],
  dogsOrdered: [],
  filter: false,
};
const reducer = (state = initialState, { type, payload }) => {
  const ITEMS_PER_PAGE = 8;
  switch (type) {
    case GET_TEMPERAMENT:
      return {
        ...state,
        allTemperament: payload
      }
      break;
    case GET_DOGS:
      return {
        ...state,
        allDogs: [...payload].splice(0, ITEMS_PER_PAGE),
        allDogsBackup: payload
      }
      break;
      case GET_DOGSDB:
      return {
        ...state,
        allDogs: [...payload].splice(0, ITEMS_PER_PAGE),
        allDogsBackup: payload
      }
      break;
      case GET_DOGSAPI:
      return {
        ...state,
        allDogs: [...payload].splice(0, ITEMS_PER_PAGE),
        allDogsBackup: payload
      }
      break;
    case PAGINATE:
      const nextPage = state.currentPage + 1;
      const prevPage = state.currentPage - 1;
      const firstIndex = payload === "next" ? nextPage * ITEMS_PER_PAGE : prevPage * ITEMS_PER_PAGE;
      if (state.filter) {
        if (payload === "next" && firstIndex >= state.dogsFiltered.length) return state;
        else if (payload === "prev" && prevPage < 0) return state;
        return {
          ...state,
          allDogs: [...state.dogsFiltered].splice(firstIndex, ITEMS_PER_PAGE),
          currentPage: payload === "next" ? nextPage : prevPage
        }
      }

      if (payload === "next" && firstIndex >= state.allDogsBackup.length) return state;
      else if (payload === "prev" && prevPage < 0) return state;

      return {
        ...state,
        allDogs: [...state.allDogsBackup].splice(firstIndex, ITEMS_PER_PAGE),
        currentPage: payload === "next" ? nextPage : prevPage
      }

      break;
    case GET_DOG_NAME:
      return {
        ...state,
        allDogs: payload,
      }
      break;
    case FILTER:
      
      const filterByTemperament = [...state.allDogsBackup].filter(t => t.temperaments?.includes(payload));
      return {
        ...state,
        allDogs: filterByTemperament.splice(0, ITEMS_PER_PAGE),
        dogsFiltered: filterByTemperament,
        filter: true
      }
      break
    case ORDER:
      
      let filteract = state.filter;
      let orderByTemperaments = [];
      
      if (filteract) {
        if (payload === 'A') {
          orderByTemperaments = [...state.allDogs].sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
            return 0;
          })
        }
        else if (payload === 'Z') {
          orderByTemperaments = [...state.allDogs].sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
            return 0;
          })
        }
        else if (payload === 'Menor') {
          orderByTemperaments = [...state.allDogs].sort((a, b) => {
            
            return a.weight.metric.split("-").map((e) => parseInt(e.trim(), 10))[0] - b.weight.metric.split("-").map((e) => parseInt(e.trim(), 10))[0]
          })
        }
        else if (payload === 'Mayor') {
          orderByTemperaments = [...state.allDogs].sort((a, b) => {
            return b.weight.metric.split("-").map((e) => parseInt(e.trim(), 10))[0] - a.weight.metric.split("-").map((e) => parseInt(e.trim(), 10))[0]
          })
        }
        
        else if (payload === '-') {
          filteract = false;
          orderByTemperaments = [...state.allDogsBackup];
        }
        else if (payload === 'Order') {

          orderByTemperaments = [...state.allDogs];


        }
      }
      else {

        if (payload === 'A') {
          orderByTemperaments = [...state.allDogsBackup].sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
            return 0;
          })
        }
        else if (payload === 'Z') {
          orderByTemperaments = [...state.allDogsBackup].sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
            return 0;
          })
        }
        else if(payload === 'Menor'){
          
          orderByTemperaments = [...state.allDogsBackup].sort((a, b) => {
            return a.weight.metric.split("-").map((e) => parseInt(e.trim(), 10))[0] - b.weight.metric.split("-").map((e) => parseInt(e.trim(), 10))[0]
          })
        }
        else if(payload === 'Mayor'){
          orderByTemperaments = [...state.allDogsBackup].sort((a, b) => {
            return b.weight.metric.split("-").map((e) => parseInt(e.trim(), 10))[0] - a.weight.metric.split("-").map((e) => parseInt(e.trim(), 10))[0]
          })
        }
        else if (payload === '-') {
          filteract = false;
          orderByTemperaments = [...state.allDogsBackup];
        }
        else if (payload === 'Order') {
          orderByTemperaments = [...state.allDogsBackup];
        }
      }
      if (payload === 'Order') {
        orderByTemperaments = [...state.allDogs];
      }
      if (payload === '-') {
        filteract = false;
        orderByTemperaments = [...state.allDogsBackup];
      }
      return {
        ...state,
        allDogs: [...orderByTemperaments].splice(0, ITEMS_PER_PAGE),
        dogsOrdered: orderByTemperaments,
        filter: filteract

      }
      break

    default: return state
      break;
  }
}

export default reducer;