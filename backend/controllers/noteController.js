const Note = require("../models/Note")

exports.createNote = async (req, res) => {
    try {
        const note = await Note.create({
            title: req.body.title,
            content: req.body.content,
            user: req.user.id,
        });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({message: "error creating note"});

    }
    
};

exports.getNotes = async(req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({message: "error while fetchng notes"});
    }

};

exports.updateNote = async (req, res) =>{
    try {
        const note = await Note.findOneAndUpdate(
            {_id: req.params.id, user: req.user.id},
             req.body,
             {new: true})
        if(!note) return res.status(404).json({message: "note not found"});
        res.status(200).json(note);    
    } catch (error) {
       res.status(500).json({message:"error updating the note"});
    }
};

exports.deleteNote = async (req,res) => {
    try {
        const note = await Note.findOneAndDelete({_id: req.params.id, user: req.user.id})
        if(!note) return res.status(404).json({message: "note not found"});
        res.status(200).json({message: "note deleted"})
    } catch (error) {
        res.status(500).json({message: "error while deleting the note"});
    }
};