const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  // untuk membuat notes
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  // untuk menampilkan notes
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  // untuk menampilkan detail dari notes
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
