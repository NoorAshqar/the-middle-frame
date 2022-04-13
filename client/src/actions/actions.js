// Creates Redux functions that edit the Redux variables to be used by any React||Redux component

export const store = (z) => {
    return {
        type: 'STORE-USER',
        user: z
    }
}

export const hotels = (z) => {
    return {
        type: 'STORE-HOTELS',
        user: z
    }
}
export const searchCity = (z) => {
    return {
        type: 'SEARCH_CITY',
        CitySearch: z
    }
}
export const searchHotel = (z) => {
    return {
        type: 'SEARCH_HOTEL',
        HotelSearch: z
    }
}
export const saveSearch = (cityinfo, cityName) => {
    return {
        type: 'SAVE_SEARCH',
        cityInfo: cityinfo,
        cityName: cityName
    }
}
