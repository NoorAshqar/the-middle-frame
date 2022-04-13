import React from "react"
import 'date-fns';
import { Typography } from '@material-ui/core';
import "./greeting.css"
class Greeting extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div style={{ backgroundColor: "lavender" }}>
            <div position="static" className="greeting" style={{ backgroundColor: "lavender" }} >
                <Typography variant="h3" className="text" style={{ backgroundColor: "lavender" }}>
                    <p style={{ color: "black", fontFamily: "Dancing Script", fontSize: "36px", fontStyle: "normal", fontWeight: "bolder", fontVariant: "normal", fontHeight: 700, lineHeight: "26.4px" }}>.......... Where To Next? ..........</p>
                </Typography>
            </div>
        </div>
        )
    }
}

export default Greeting

