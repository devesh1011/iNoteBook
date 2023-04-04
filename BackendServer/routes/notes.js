const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// Route 1: Fetch all notes using GET: "api/notes/fetchallnodes". Login Required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
}
)

// Route 2: Add a new note using POST: "api/notes/addnote". Login Required
router.post('/addnote',
    [body('title', "Enter a valid title").isLength({ min: 8 }),
    body('description', "Description about the title must be atleast 20 characters").isLength({ min: 20 })],
    fetchUser, async (req, res) => {
        const { title, description, tag } = req.body;

        // If there are errors, return Bad Request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Creating a new note
            const note = new Notes({
                title, description, tag, user: req.user.id
            })

            // saving the note
            const savedNote = await note.save();

            // sending the note as response
            res.json(note)
        } catch (error) {
            return res.status(500).send("Internal Server Error: Some error occured");
        }
    }
)

// Route 3: Update a note using POST: "api/notes/update" Login Required
router.put('/update/:id',
    [body('title', "Enter a valid title").isLength({ min: 8 }),
    body('description', "Description about the title must be atleast 20 characters").isLength({ min: 20 })], fetchUser,
    async (req, res) => {
        const { title, description, tag } = req.body;

        try {
            // Create a new note
            const newNote = {};

            if (title) {
                newNote.title = title;
            }

            if (description) {
                newNote.description = description;
            }

            if (tag) {
                newNote.tag = tag;
            }

            // Find the note to be updated and make changes in it
            let note = await Notes.findById(req.params.id)

            if (!note) {
                return res.status(404).send("Not Found")
            }

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }

            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({ note })
        } catch (error) {
            return res.status(500).send("Internal Server Error: Some error occured");
        }
    })

// Deleting a note using DELETE : "api/notes/delete" Login Required
router.delete('/delete/:id', fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id)

        if (!note) {
            return res.status(404).send("Not Found")
        }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)

        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        return res.status(500).send("Internal Server Error: Some error occured");
    }
})

module.exports = router
