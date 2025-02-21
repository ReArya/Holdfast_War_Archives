import mongoose from "mongoose";

const pickupsSchema = mongoose.Schema(
    {
        Player: {
            type: String,
            required: true,
        },
        Score: {
            type: Number,
            required: true,
        },
        Kills: {
            type: Number,
            required: true,
        },
        Deaths: {
            type: Number,
            required: true,
        },
        Assists: {
            type: Number,
            required: true,
        },
        "Team Kills": {
            type: Number,
            required: true,
        },
        Blocks: {
            type: Number,
            required: true,
        },
        "Impact Rating": {
            type: Number,
            required: true,
        },
        Regiment: {
            type: String,
            required: true,
        },
        Win: {
            type: Number,
            required: true,
        },
        Date: {
            type: String,
            required: true,
        }
    }, {
        collection : 'PickupsStats',
        versionKey : false
    }
);




export const PickupsStats = mongoose.model('PickupsStats', pickupsSchema)