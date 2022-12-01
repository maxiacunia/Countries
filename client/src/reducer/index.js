
const initialState = {
    countries: [],
    allCountries: [],
    detail:[]
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case 'GET_NAME_COUNTRY':
            return{
                ...state,
                countries: action.payload
            }
        case 'POST_ACTIVITY':
            return{
                ...state
            }
        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }
        case 'FILTER_BY_CONTINENT':
            const allCountries = state.allCountries
            const countriesFiltered = action.payload === 'All' ? allCountries: allCountries.filter(el => el.continent === action.payload)
            return{
                ...state,
                countries: countriesFiltered
            }

        case 'FILTER_BY_ACTIVITY':
            const todos = state.allCountries
            const countriesFilteredByAct = action.payload === 'all' ? todos : todos.filter(el => el.actividads && el.actividads.length > 0)
            return{
                ...state,
                countries: countriesFilteredByAct
            }




        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc'?
                state.countries.sort(function(a,b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }):
                state.countries.sort(function(a,b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
            return{
                ...state,
                countries: sortedArr
            }
            case 'ORDER_BY_POPULATION':
                let sorted = action.payload === 'asc'?
                    state.countries.sort(function(a,b){
                        // if(a.population > b.population){
                        //     return 1;
                        // }
                        // if(b.population > a.population){
                        //     return -1;
                        // }
                        // return 0;
                        return a.population - b.population;
                    }):
                    state.countries.sort(function(a,b){
                        // if(a.population > b.population){
                        //     return -1;
                        // }
                        // if(b.population > a.population){
                        //     return 1;
                        // }
                        // return 0;
                        return b.population - a.population;
                    })
                return{
                    ...state,
                    countries: sorted
                }
        default: 
                return state;
    }
}

export default rootReducer;