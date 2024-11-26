const notes = require("../services/notesService");

const createNoteController = async (req, res) => {
  const note = req.body;
  const user = req.user;
  const newNote = await notes.createNote(note, user.id);

  res.status(201).json(newNote);
};

const getNotesController = async (req, res) => {
  const user = req.user;
  const notesList = await notes.getNotes(user.id);
  res.json(notesList);
};

const getNoteByIdController = async (req, res) => {
  const note = await notes.getNoteById(parseInt(req.params.id));
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
};

const updateNoteController = async (req, res) => {
  const note = await notes.updateNote(
    parseInt(req.params.id),
    req.body.title,
    req.body.content
  );

  if (!note) return res.status(404).json({ error: "Note not found" });

  res.json(note);
};

const deleteNoteContoller = async (req, res) => {
  const deletedNote = await notes.deleteNote(parseInt(req.params.id));

  if (!deletedNote) return res.status(404).json({ error: "Note not found" });

  res.json(deletedNote);
};

module.exports = {
  createNoteController,
  getNotesController,
  getNoteByIdController,
  updateNoteController,
  deleteNoteContoller,
};
