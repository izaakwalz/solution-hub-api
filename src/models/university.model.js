const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const universitySchema = new Schema({
    id: { type: String, default: 'ggg', unique: true },
    name: {
        type: String,
        trim: true,
        minlength: [5, 'University name should be at leadt 5 characters long'],
        required: [true, 'University name is required'],
    },
    slug: { type: String, trim: true, unique: true },
    abbrv: {
        type: String,
        trim: true,
        unique: true,
        maxlength: [5, 'Abbreviation field should be at most 256 characters'],
        required: [true, 'Abbreviation field is required'],
    },
    logo: String,
});

universitySchema.pre('save', async function (next) {
    this.name = slugify(this.name, { lower: true });

    next();
});

const University = model('university', universitySchema);

module.exports = University;
