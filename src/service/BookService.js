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

const updateBook = (id, data) => {
    return axios.put(`${BOOK_BASE_URL}/${id}`, data);
}
const addBook = (data) => {
    return axios.post(BOOK_BASE_URL, data);
}

const deleteBook = (bookId) => {
    return axios.delete(BOOK_BASE_URL + '/' + bookId);
}

const addBookToCollection = async (bookId, collectionId) => {
    console.log('Adding book to collection:', { bookId, collectionId });
    try {
        const response = await axios.post(BOOK_BASE_URL + '/add-to-collection', {
            bookId,
            collectionId,
        });
        console.log('Book added to collection:', response.data);
        return response.data; // Return response if needed
    } catch (error) {
        console.error('Error adding book to collection:', error);
        throw error; // Optionally rethrow or handle the error as needed
    }
};

const getBookCollectionsByBookId = async (bookId) =>{
    return axios.get(BOOK_BASE_URL + '/get-collections' + '/' + bookId );
}

export {getAllBooks, getBookById, updateBook, addBook, deleteBook, addBookToCollection, getBookCollectionsByBookId}