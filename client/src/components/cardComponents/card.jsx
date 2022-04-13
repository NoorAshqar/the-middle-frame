import RecipeReviewCard from './read'
import React from 'react';

export default function CardComp({removeGetRes,hideFav,hideRes,compDidmount,reserveShow,favoriteNotEmp,adults,dateDifferenceNumber, reservationArray,favoritesArray,data,currentUser, checkIn, checkOut, searchValue, cityAndCountry, handleSeachButtonClick }) {
    return (
    <div>
        <RecipeReviewCard removeGetRes={removeGetRes} hideRes={hideRes} hideFav={hideFav}  compDidmount={compDidmount} adults={adults} reserveShow={reserveShow} favoriteNotEmp={favoriteNotEmp} dateDifferenceNumber={dateDifferenceNumber} currentUser={currentUser} data={data} reservationArray={reservationArray} favoritesArray={favoritesArray}/>
    </div>
    )
};
