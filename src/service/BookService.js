import axios from 'axios'

const BOOK_BASE_URL = "http://localhost:5146/api/book";

const getAllBooks = () => {
    return axios.get(BOOK_BASE_URL)
    .then(response => {
        console.log('Get All Books Response:', response);
        return response;
    })
    .catch(error => {
        console.error('Error fetching all books:', error);
        throw error;
    });
}

const getBookById = (bookId) => {
    return axios.get(BOOK_BASE_URL + '/' + bookId);
}

const updateBook = (data) => {
    return axios.put(BOOK_BASE_URL, data);
}

const addBook = (data) => {
    return axios.post(BOOK_BASE_URL, data);
}

const deleteBook = (bookId) => {
    return axios.delete(BOOK_BASE_URL + '/' + bookId);
}

export {getAllBooks, getBookById, updateBook, addBook, deleteBook}