import CardComp from "../cardComponents/card";
import NavAndSearch from "../navBar/navBar";
import Map from "../../components/Map/Map";
import { Button } from '@material-ui/core';
import React from 'react';
import $ from 'jquery';
import { searchHotel } from '../../actions/actions.js';
import { connect } from 'react-redux';

class CardList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            removeGetRes: false,
            reservationsArray: [],
            map: false,
            sortOrder: "descending"
        }
    }
    componentDidMount = () => {
        this.props.searchHotel(this.props.resultsArray)
        fetch("http://localhost:5000/user/getuser", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "displayName": this.props.currentUser }),
        })
            .then(data => {
                if (data.status === 200) {
                    data.json()
                } else {
                    throw new Error('You are not signed in')
                }
            })
            .then(data => { if (data) { this.setState({ reservationsArray: data.reservations }) } })
            .catch(err => console.log(err))
    }
   
      search1 = (e) => {
        let word = e.target.value.toLowerCase();
        let all = this.props.resultsArray;
        if (word === '') {
          this.props.searchHotel(all);
        } else {
          let newList = all.filter(elem => {
            let name = elem.name.toLowerCase().toString()
            if (name.includes(word)) {
              return true
            }
            return false
          })
          this.props.searchHotel(newList)
        }
        
      }
    Sorting = () => {
        if ($('#sort').val() === 'PriceD') {
            this.props.HotelSearch.sort((a, b) => a.ratePlan.price.current > b.ratePlan.price.current ? -1 : 0
                , this.setState({}))
        }
        if ($('#sort').val() === 'PriceA') {
            this.props.HotelSearch.sort((a, b) => a.ratePlan.price.current < b.ratePlan.price.current ? -1 : 0
                , this.setState({}))
        }

        if ($('#sort').val() === 'RateD') {
            this.props.HotelSearch.sort((a, b) => a.starRating > b.starRating ? -1 : 0
                , this.setState({}))
        }
        if ($('#sort').val() === 'RateA') {
            this.props.HotelSearch.sort((a, b) => a.starRating < b.starRating ? -1 : 0
                , this.setState({}))
        }

        if ($('#sort').val() === 'Rate2D') {
            this.props.HotelSearch.sort((a, b) => a.guestReviews.unformattedRating > b.guestReviews.unformattedRating ? -1 : 0
                , this.setState({}))
        }
        if ($('#sort').val() === 'Rate2A') {
            this.props.HotelSearch.sort((a, b) => a.guestReviews.unformattedRating < b.guestReviews.unformattedRating ? -1 : 0
                , this.setState({}))
        }

        if ($('#sort').val() === 'ReviewsD') {
            this.props.HotelSearch.sort((a, b) => a?.guestReviews?.total > b?.guestReviews?.total ? -1 : 0
                , this.setState({}))
        }
        if ($('#sort').val() === 'ReviewsA') {
            this.props.HotelSearch.sort((a, b) => a?.guestReviews?.total < b?.guestReviews?.total ? -1 : 0
                , this.setState({}))
        }
    }

    render() {
        const { handleAdultsChange, adults, dateDifferenceNumber, checkIn, checkOut, searchValue, cityAndCountry, handleSeachButtonClick, currentUser } = this.props
        return (
            <div >
                <NavAndSearch handleAdultsChange={handleAdultsChange} handleSeachButtonClick={handleSeachButtonClick} currentUser={currentUser} checkIn={checkIn} checkOut={checkOut} searchValue={searchValue} cityAndCountry={cityAndCountry} />
                <Button variant="outlined" size="medium" color="primary" style={{ height: 30, float:"right", marginRight: "2vw", marginTop: "-30px" }} onClick={(e) => { e.preventDefault(); handleSeachButtonClick() }}>
                <p style={{ position:"relative",zIndex:"2",color:"navy" }} onClick={() => { this.setState({ map: !this.state.map }); this.props.refresh()}}>Show map</p>
                </Button>
                <div className="select" style={{ position:"relative", marginLeft: "1vw", marginTop: "-20px" }}>
                    <select id="sort" onChange={this.Sorting.bind(this)}>
                        <option value="sort">Sort Hotels</option>
                        <option value="PriceA">Price A</option>
                        <option value="PriceD">Price D</option>
                        <option value="RateA" >International A</option>
                        <option value="RateD" >International D</option>
                        <option value="Rate2A" >People Rating A</option>
                        <option value="Rate2D" >People Rating D</option>
                        <option value="ReviewsA" >Reviews A</option>
                        <option value="ReviewsD" >Reviews D</option>
                    </select>
                </div>
                <input type="serach" className="search" onChange={this.search1} placeholder="Filter" style={{marginTop: "10px", marginBottom: "10px"}} ></input>
                <br/>
                {this.state.map ? <Map hotels={this.props.resultsArray} location={this.props.cityCenter()} google={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA290JxnUbW5ma-SY6qgc8l4VeKAJyUV14`}></Map> : <div></div>}
                {
                    this.props.HotelSearch.length ?
                        this.props.HotelSearch.map((data, i) => {
                            let ele = this.state.removeGetRes
                            this.state.reservationsArray.forEach(element => {
                                if (element.id === data.id) {
                                    ele = true
                                }
                            })
                            return <CardComp dateDifferenceNumber={dateDifferenceNumber} removeGetRes={ele} key={i} data={data} adults={adults} compDidmount={this.componentDidMount} currentUser={currentUser} />
                        })
                        :
                        <h2 style={{ textAlign: "center" }}>
                            ..... Loading Results .....
                        </h2>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      HotelSearch: state.HotelSearch,
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      searchHotel: (z) => { dispatch(searchHotel(z)) }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CardList);

