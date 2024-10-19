import axios from "axios";

const API_URL = "http://localhost:5146/api/author";

const getAllAuthors = () => {
    return axios.get(API_URL);
}
const addBookToAuthor = async (bookId, authorId) => {
    console.log('Adding book to author:', { bookId, authorId });
    try {
        const response = await axios.post(API_URL + '/add-book-to-author', {
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
      const response = await axios.delete(`${API_URL}/${bookId}/author/${authorId}`);
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

export {getAllAuthors, addBookToAuthor, removeAuthorFromBook};