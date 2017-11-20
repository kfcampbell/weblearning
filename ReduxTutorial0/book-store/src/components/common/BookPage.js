import React from 'react';

class Book extends React.Component {
    constructor(props){
        super(props);
    }

    submitBook(input){
        alert('Book submitted!');
    }

    render(){
        return(
            <div>
            </div>
        );
    }
}

export default Book;