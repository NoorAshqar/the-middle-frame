import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CardContent from '@material-ui/core/CardContent';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import React from 'react';
import './card.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard({ removeGetRes,compDidmount, reserveShow, favoriteNotEmp, adults, dateDifferenceNumber, data, currentUser, hideRes, hideFav }) {
  const classes = useStyles();
  const [reservation, setReservation] = React.useState((removeGetRes || reserveShow || false));
  const handleFavAdd = (data, currentUser) => {
    fetch('http://localhost:5000/fav/add', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "displayName": currentUser, "favorites": data }),
    })
      .then(response => response.json())
      .then((data) => {
        compDidmount()
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const handleFavRemove = (data, currentUser) => {
    fetch('http://localhost:5000/fav/delete', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "displayName": currentUser, "favorites": data }),
    })
      .then(response => response.json())
      .then(data => {
        compDidmount()
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const handleReserveAdd = (data, currentUser) => {
    fetch('http://localhost:5000/reservation/add', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "displayName": currentUser, "reservations": data }),
    })
      .then(response => response.json())
      .then(data => {
        compDidmount()
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setReservation(true)
  }
  const handleReserveRemove = (data, currentUser) => {
    fetch('http://localhost:5000/reservation/delete', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "displayName": currentUser, "reservations": data }),
    })
      .then(response => response.json())
      .then(data => {
        compDidmount()
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    if (!hideFav)
      setReservation(false)
  }
  const priceConverter = (price, adults, date) => {
    let res = price.split("$")
    let x = Number(res[1])
    return x * adults * date
  }
  return (
    <Card className={classes.root+" body"} id={"a"+data.id}>
      <div className="first_img">
        <div>
          <img src={data.optimizedThumbUrls.srpDesktop} className="img img_abs" alt="" style={{borderRadius:"15px"}}/>
        </div>
      </div>
      <div className="center">
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <div>
              <Typography component="h6" variant="h6">
                {data.name}
              </Typography>
            </div>
            <div className="center-second">
              <Typography component="div" variant="subtitle1" color="textSecondary">
                <div className="citysize">
                {data.address.streetAddress} --- {data.address.locality}
                </div>
              </Typography>
            </div>
          </CardContent>
          <div className="dollers">
            <Typography  component="div">
              <div className="facility">
              {data.ratePlan ?
            "$"+priceConverter(data.ratePlan.price.current , adults, dateDifferenceNumber()) +" Total price for the days selected"
              : "$0"}
              </div>
            </Typography>
          </div>
        </div>
      </div>
      <div className='third_component'>
        <div className="third_component_thirdline">
          <Typography component="div">
              <div>
                  International : <Rating name="half-rating-read" defaultValue={data.starRating ? data.starRating : 0} readOnly />
                  <br/>
                  People Rating : <Rating name="half-rating-read" defaultValue={data.guestReviews ? (data.guestReviews.unformattedRating/2) : 0} readOnly />
                  <br/>
                  Number of Reviews : {data.guestReviews ? data.guestReviews.total : 0}
              </div>
          </Typography >
        </div>
        <div className="third_component_secondline">
          {
            currentUser ?
              reservation ?
                <Button variant="contained" color="primary" onClick={() => handleReserveRemove(data, currentUser)}>
                  remove reservation
                </Button>
                :
                <Button variant="contained" color="primary" onClick={() => handleReserveAdd(data, currentUser)}>
                  reserve here
                </Button>
                :
                <div></div>
          }
        </div>
      </div>
    </Card>
  )
}
