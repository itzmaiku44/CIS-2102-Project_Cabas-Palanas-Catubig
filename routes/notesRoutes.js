const express = require("express");
const router = express.Router();
const notes = require("../controllers/notesController");
const validateToken = require("../middlewares/auth");

router.post("/", validateToken, notes.createNoteController);
router.get("/", validateToken, notes.getNotesController);
router.get("/:id", validateToken, notes.getNoteByIdController);
router.put("/:id", validateToken, notes.updateNoteController);
router.delete("/:id", validateToken, notes.deleteNoteContoller);

module.exports = router;
