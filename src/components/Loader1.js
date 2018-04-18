import React from 'react'
import './Loader.css'

class Loader extends React.Component {
    render(){
        return(
            <div>
                <h1>In progress..</h1>
                <div id="cooking">
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div id="area">
                    <div id="sides">
                    <div id="pan"></div>
                    <div id="handle"></div>
                    </div>
                    <div id="pancake">
                    <div id="pastry"></div>
                    </div>
                </div>
                </div>

            </div>
        )
    }
}

export default Loader