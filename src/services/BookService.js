import axiosInstance from '../context/AxiosConfig';

const BOOK_API = import.meta.env.VITE_API_URL + "/book";

const getAllBooks = () => {
    return axiosInstance.get(`${BOOK_API}`)
        .then(response => {
            console.log('Get All Books Response:', response);
            return response;
        })
        .catch(error => {
            console.error('Error fetching all books:', error);
            throw error;
        });
};

const getBookById = (bookId) => {
    return axiosInstance.get(`${BOOK_API}/${bookId}`);
};

const updateBook = (id, data) => {
    return axiosInstance.put(`${BOOK_API}/${id}`, data);
};

const addBook = (data) => {
    return axiosInstance.post(`${BOOK_API}`, data);
};

const deleteBook = (bookId) => {
    return axiosInstance.delete(`${BOOK_API}/${bookId}`);
};

const addBookToCollection = async (bookId, collectionId) => {
    console.log('Adding book to collection:', { bookId, collectionId });
    try {
        const response = await axiosInstance.post(`${BOOK_API}/add-to-collection`, {
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

const getBookCollectionsByBookId = async (bookId) => {
    return axiosInstance.get(`${BOOK_API}/get-collections/${bookId}`);
};

const getAuthorByBookId = (bookId) => {
    return axiosInstance.get(`${BOOK_API}/get-authors/${bookId}`);
};

export {
    getAllBooks,
    getBookById,
    updateBook,
    addBook,
    deleteBook,
    addBookToCollection,
    getBookCollectionsByBookId,
    getAuthorByBookId
};
