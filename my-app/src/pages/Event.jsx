import React from "react"
import JsonData from "../events.json"

function JsonDataDisplay(){
    const DisplayData=JsonData.map(
        (info)=>{
            return(
                <ul className="eventlist">
                    <li className="eventitem">{info.id}</li>
                    <li className="eventitem">{info['Title ']}</li>
                    <li className="eventitem">£{info.Price}</li>
                    <li className="eventitem">{info.Categories}</li>
                    <li className="eventitem">{info.Time}</li>
                </ul>
            )
        }
    )
    return(
        <div>
                    {/* {DisplayData} */}
                    Events
        </div>
    )
 }
 export default JsonDataDisplay;