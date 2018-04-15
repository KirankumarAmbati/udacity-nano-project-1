import React from 'react'
import BookShelf from './BookShelf'

class Library extends React.Component {
    render(){
        return(
            <div>
                <BookShelf title={"Currently Reading"} books = {this.props.currentlyReadingBooks}/>
                <BookShelf title={"Want to Read"} books = {this.props.wantToReadBooks}/>
                <BookShelf title={"Read"} books = {this.props.readBooks}/>
            </div>
        )
    }
}

export default Library