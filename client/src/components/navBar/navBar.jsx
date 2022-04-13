import InputSearch from "../inputSearch/inputSearch";
import TextField from '@material-ui/core/TextField';
import MaterialUIPickers from "../date/date";
import Greeting from '../greeting/greeting';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import AppBarr from '../AppBar/AppBar';
import React from "react";
import "./navBar.css";
import 'date-fns';

class NavAndSearch extends React.Component {
  render() {
    const { handleAdultsChange,checkIn, checkOut, searchValue, cityAndCountry, handleSeachButtonClick, currentUser } = this.props
    return (
      <div className="two-comp">
        <AppBarr currentUser={currentUser} />
        <div className="Greeting" >
          <Greeting />
          <form className="form" noValidate autoComplete="off">
            City
            <InputSearch searchValue={searchValue} cityAndCountry={cityAndCountry} />
            <MaterialUIPickers name="check in" checkInOrOut={checkIn} />
            <MaterialUIPickers name="check out" checkInOrOut={checkOut} />
            No.People
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "7px" }}>
              <TextField
                id="standard-number"
                InputProps={{ inputProps: { min: 1 } }}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>handleAdultsChange(e.target.value) }
              />
            </div>
            <div className="search">
              <Button variant="outlined" size="medium" color="primary" style={{ height: 30 }} onClick={(e) => { e.preventDefault(); handleSeachButtonClick() }}>
                <Link to='/cardlist' >
                  <p style={{ color: "Navy" }}>search</p>
                </Link>
              </Button>
            </div>
          </form>
        </div>
        <div>
        </div>
      </div>
    )
  }
};

export default NavAndSearch;
