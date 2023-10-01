const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  // request payload untuk mendapatkan body request di hapi
  const { title, tags, body } = request.payload;
  // nanoid untuk membuat nilai uniq
  const id = nanoid(16);

  // membuat properti untuk menambahkan catatan baru
  const createAt = new Date().toISOString();
  const updateAt = createAt;

  const newNote = {
    title, tags, body, id, createAt, updateAt,
  };

  notes.push(newNote);

  // isSuccess kita gunakan untuk menentukan respons yang diberikan server
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  response.code(500);
  return response;
};

// handler untuk client agar bisa menampilkan otes
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// handler untuk client agar bisa menampilkan notes secara detail
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);
  return response;
};

// handler untuk client agar bisa mengedit notes sesuai dengan id notes
const editNoteByIdHandler = (request, h) => {
  // mendapatkan ilai id
  const { id } = request.params;
  // mendapatkan data notes terbaru yang dikirimkan ole client melalui body request
  const { title, tags, body } = request.payload;
  // updateArt jadi mendapatkan nilai terbaru dengan menggunakan new Date().toISOString()
  const updateArt = new Date().toISOString();
  // mengubah notes lama dengan data baru dengan memanfaatkan indexing array
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateArt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbaharui catatan. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

// handler untuk menghapus notes
const deleteNoteByIdHandler = (request, h) => {
  // kita dapatkan dulu nilai id yang dikirim melalui path parameter
  const { id } = request.params;

  // mendapatkan index dari objek catatan sesuai dengan id yang didapat
  const index = notes.findIndex((note) => note.id === id);

  /* melakukan pengecekan terhadap nilai index */
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
