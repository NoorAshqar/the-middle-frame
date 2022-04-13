
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { searchHotel, saveSearch } from './actions/actions.js';
import CardList from "./components/CardList/cardList";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/homePage/homePage";
import UserSign from "./pages/UserSign/UserSign";
import { connect } from 'react-redux';
import React from "react";
import './App.css';
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: localStorage.getItem("current-user"),
      checkIn: "2020-12-24",
      checkOut: "2020-12-30",
      searchValue: "",
      adults: 1,
      resultsArray: [],
      admin: false,
      cityAndCountry: ""
    }
  }

  //converting the date into numbers
  dateDifferenceNumber = () => {
    let x = this.state.checkIn.split("-")
    let y = this.state.checkOut.split("-")
    return (y[0] - x[0]) * 365 + (y[1] - x[1]) * 30 + (y[2] - x[2])
  }

  handleCheckInChange = (checkIn) => {
    this.setState({ checkIn })
  }

  handleCheckOutChange = async (checkOut) => {
    await this.setState({ checkOut })
    let x = this.state.checkIn.split("-")
    let y = this.state.checkOut.split("-")
    if ((y[0] - x[0]) * 365 + (y[1] - x[1]) * 30 + (y[2] - x[2]) < 0)
      alert("check-in date should be before check-out")
  }

  handlesearchValueChange = (searchValue) => {
    this.setState({ searchValue })
  }

  handleAdultsChange = (data) => {
    let data1 = Number(data)
    this.setState({ adults: data1 })
  }

  handleCityAndCountry = (cityAndCountry) => {
    this.setState({ cityAndCountry })
  }

  getCityCenter = () => {
    return this.state.cityCenter
  }

  refresh = () => {
    this.setState({})
  }

  handleSeachButtonClick = () => {
    this.setState({resultsArray: []})
    let oldState = this.props.results[this.state.searchValue]
    if (oldState) {
      this.setState({
        cityCenter: oldState.cityCenter,
        resultsArray: oldState.resultsArray
      })
    } else {
      let allData = {}
      if (this.state.searchValue) {
        fetch(`https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=${this.state.searchValue}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": "60c160b303msh7203505fed160fep1856fejsn13da7ee5b70d",
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
          }
        })
          .then(response => {
            return response.json()
          })
          .then((data) => {
            if (data) {
              if (data.suggestions[0]) {
              if (data.suggestions[0].entities[0]) {
                this.setState({ cityCenter: data.suggestions[0].entities[0] })
                allData.cityCenter = data.suggestions[0].entities[0]
                fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${data.suggestions[0].entities[0].destinationId}&pageNumber=1&checkIn=${this.state.checkIn}&checkOut=${this.state.checkOut}&pageSize=25&adults1=1&currency=USD&locale=en_US&sortOrder=PRICE`, {
                  "method": "GET",
                  "headers": {
                    "x-rapidapi-key": "60c160b303msh7203505fed160fep1856fejsn13da7ee5b70d",
                    "x-rapidapi-host": "hotels4.p.rapidapi.com",
                  }
                })
                  .then(response => {
                    return response.json()
                  })
                  .then(data => {
                    this.props.searchHotel(data.data.body.searchResults.results)
                    this.setState({ resultsArray: data.data.body.searchResults.results })
                    allData.resultsArray = data.data.body.searchResults.results
                    this.props.saveSearch(allData, this.state.searchValue)
                  })
                  .then(data => { })
                  .catch(err => {
                    console.error(err);
                  });
              } else {
                this.setState({
                  resultsArray: [{
                    address: { streetAddress: "middle of nowhere", locality: "Nowhere" },
                    coordinate: { lat: 0, lon: 0 },
                    name: "No Hotel",
                    guestReviews: { unformattedRating: 0, total: 1 },
                    ratePlan: { price: { current: "$0" } },
                    starRating: 0,
                    thumbnailUrl: "https://i.insider.com/562fbe249dd7cc1b008c528d?width=700"
                  }]
                })
              }
            }
          }})
          .catch(err => {
            console.error(err);
          });
      }
    }
  }

  componentDidMount() {
    //checking the auth
    if(this.state.currentUser){const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'jwt-auth': localStorage.getItem('jwt-auth')
      }
    }
    fetch("/user/auth", requestOptions)
      .then(res => res.json())
      .then(data => {
        if (data.displayName) localStorage.setItem("current-user", data.displayName)
        this.setState({
          admin: data.admin
        })
      })}
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/signin" render={() =>
            this.state.currentUser
              ? (<Redirect to='/' />)
              : (<UserSign />)} />
          <Route exact path="/signup" render={() =>
            this.state.currentUser
              ? (<Redirect to='/' />)
              : (<UserSign />)} />
          <Switch>
            <Route exact path="/" render={() => <div><HomePage handleAdultsChange={this.handleAdultsChange} handleSeachButtonClick={this.handleSeachButtonClick} currentUser={this.state.currentUser} cityAndCountry={this.handleCityAndCountry} checkIn={this.handleCheckInChange} checkOut={this.handleCheckOutChange} searchValue={this.handlesearchValueChange} /><Footer /></div>} />

            <Route exact path="/cardlist" render={() => <CardList refresh={this.refresh} cityCenter={this.getCityCenter} handleAdultsChange={this.handleAdultsChange} adults={this.state.adults} dateDifferenceNumber={this.dateDifferenceNumber} reservationArray={this.handleReservationArray} favoritesArray={this.handleFavoritesArray} handleSeachButtonClick={this.handleSeachButtonClick} currentUser={this.state.currentUser} cityAndCountry={this.handleCityAndCountry} checkIn={this.handleCheckInChange} checkOut={this.handleCheckOutChange} searchValue={this.handlesearchValueChange} resultsArray={this.state.resultsArray} />} />

    
          </Switch>
          
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    HotelSearch: state.HotelSearch,
    results: state.results
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    searchHotel: (z) => { dispatch(searchHotel(z)) },
    saveSearch: (cityInfo, cityName) => { dispatch(saveSearch(cityInfo, cityName)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
