import axios from "axios";

const AUTHOR_API = import.meta.env.VITE_API_URL + "/author";

const getAllAuthors = () => {
    return axios.get(AUTHOR_API);
};

const addBookToAuthor = async (bookId, authorId) => {
    console.log('Adding book to author:', { bookId, authorId });
    try {
        const response = await axios.post(`${AUTHOR_API}/add-book-to-author`, {
            bookId,
            authorId,
        });
        console.log('Book added to collection:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding book to collection:', error);
        throw error; 
    }
};

const removeAuthorFromBook = async (bookId, authorId) => {
    try {
        const response = await axios.delete(`${AUTHOR_API}/${bookId}/author/${authorId}`);
        console.log('Response:', response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error('Error:', error.response.data.message);
        } else {
            console.error('An error occurred:', error);
            alert('An error occurred while removing the collection.');
        }
    }
};

const addAuthor = (data) => {
    return axios.post(AUTHOR_API, data);
};

const deleteAuthor = (id) => {
    return axios.delete(`${AUTHOR_API}/${id}`);
};

const getAuthorById = (authorId) => {
    return axios.get(`${AUTHOR_API}/${authorId}`);
};

const updateAuthor = (id, data) => {
    return axios.put(`${AUTHOR_API}/${id}`, data);
};

export { getAllAuthors, addBookToAuthor, removeAuthorFromBook, updateAuthor, getAuthorById, addAuthor, deleteAuthor };
