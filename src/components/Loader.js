import React from 'react'
import './Loader.css'

//Taken from Abhijit Hota @Codepen.io: https://codepen.io/XDBoy018/pen/JAmFl including corresponding CSS..

class Loader extends React.Component {
    render() {
        return(
            <div className='container'>
                <div className='before'></div>
                <div className='before'></div>
                <div className='before'></div>
                <div className='before'></div>
                <div className='before'></div>
                <div className='before'></div>
                <div className='before'></div>
                <div className='before'></div>
                <div className='before'></div>
            </div>
        )
    }
}

export default Loader