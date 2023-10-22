const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    ticket: {
        type: Number, // This is where the auto-incremented value will be stored, starting from zero
    }
}, {
    timestamps: true
});

noteSchema.plugin(AutoIncrement, { inc_field: 'ticket', start_seq: 500 }); // Enable auto-increment for the 'ticket' field

module.exports = mongoose.model('Note', noteSchema);
