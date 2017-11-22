import { combineReducers } from 'redux';
import books from './bookReducers';

export default combineReducers({
    books: books,
    // more reducers can go here
});