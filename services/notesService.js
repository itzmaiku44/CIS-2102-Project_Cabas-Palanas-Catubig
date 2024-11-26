const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createNote = async (note, userId) => {
  const newNote = await prisma.note.create({
    data: {
      title: note.title,
      content: note.content,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return newNote;
};

const getNotes = async (userId) => {
  const notes = await prisma.note.findMany({
    where: {
      userId: userId,
    },
  });
  return notes;
};

const getNoteById = async (id) => {
  const note = await findNote(id);
  return note;
};

const updateNote = async (id, title, content) => {
  const note = await findNote(id);

  if (!note) return null;

  const updatedNote = await prisma.note.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
    },
  });

  return updatedNote;
};

const deleteNote = async (id) => {
  const note = await findNote(id);

  if (!note) return null;

  const deletedNote = await prisma.note.delete({
    where: {
      id: id,
    },
  });

  return deletedNote;
};

const findNote = async (id) => {
  const note = await prisma.note.findUnique({
    where: {
      id: id,
    },
  });

  return note;
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
