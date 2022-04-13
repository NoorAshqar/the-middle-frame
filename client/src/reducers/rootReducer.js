// Creates the Redux Store
const initState = {
    test: [
        { username: "ahamd", password: "123" }
    ],
    user: null,
    hotels: [],
    CitySearch:[],
    HotelSearch:[],
    showMenu: 0,
    results: {}
}

// Edits the Redux variables
const rootReducer = (state = initState, action) => {
    // console.log("action", action)
    if (action.type === "STORE-USER") {
        try {
            const serializedState = JSON.stringify({
                ...state,
                user: action.user
            });
            localStorage.setItem("state", serializedState)
        }
        catch (e) {
            console.log(e)
        }
        return {
            ...state,
            user: action.user
        }
    }
        if (action.type === "STORE-HOTELS") {
        try {
            const serializedState = JSON.stringify({
                ...state,
                user: action.user
            });
            localStorage.setItem("state", serializedState)
        }
        catch (e) {
            console.log(e)
        }
        return {
            ...state,
            hotels: action.hotels
        }
    }
    if (action.type === "SEARCH_CITY") {
        return  {
            ...state,
            CitySearch: action.CitySearch
        }
    }
    if (action.type === "SEARCH_HOTEL") {
        return  {
            ...state,
            HotelSearch: action.HotelSearch
        }
    }
    if (action.type === "SAVE_SEARCH") {
        state.results[action.cityName] = action.cityInfo
        return state
    }
    return state;
}
export default rootReducer;
