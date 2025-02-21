import express from 'express';
import { PickupsStats } from '../models/pickupsModel.js';
import { authenticateAdmin } from "../middlewares/authMiddleware.js";
import mongoose from 'mongoose';

const router = express.Router();

// Public route for reading player stats (no authentication required)
router.get('/public', async (request, response) => {
    try {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        const searchTerm = request.query.search || '';
        
        const skip = (page - 1) * limit;
        
        const searchQuery = searchTerm 
            ? { Player: { $regex: searchTerm, $options: 'i' } }
            : {};
            
        const total = await PickupsStats.countDocuments(searchQuery);
        
        const NApickups = await PickupsStats.find(searchQuery)
            .sort({ Date: -1 })
            .skip(skip)
            .limit(limit);
            
        return response.status(200).json({
            data: NApickups,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                currentPage: page,
                limit
            }
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: 'Error fetching players',
            error: error.message
        });
    }
});



// Route to get paginated players with search
router.get('/', authenticateAdmin, async (request, response) => {
    try {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        const searchTerm = request.query.search || '';
        
        const skip = (page - 1) * limit;
        
        // Create search query if search term exists
        const searchQuery = searchTerm 
            ? { Player: { $regex: searchTerm, $options: 'i' } }
            : {};
            
        // Get total count for pagination
        const total = await PickupsStats.countDocuments(searchQuery);
        
        // Get paginated data
        const NApickups = await PickupsStats.find(searchQuery)
            .sort({ Date: -1 })
            .skip(skip)
            .limit(limit);
            
        return response.status(200).json({
            data: NApickups,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                currentPage: page,
                limit
            }
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: 'Error fetching players',
            error: error.message
        });
    }
});

// Route to get one player record by ID
router.get('/:id', authenticateAdmin, async (request, response) => {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ 
                message: "Invalid ID format",
                error: "The provided ID is not a valid MongoDB ObjectId"
            });
        }

        const playerRecord = await PickupsStats.findById(id);

        if (!playerRecord) {
            return response.status(404).json({ 
                message: "Record not found",
                error: "No player record exists with the provided ID"
            });
        }

        return response.status(200).json(playerRecord);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: 'Error fetching player record',
            error: error.message
        });
    }
});

// Route to insert a new player record
router.post('/insertPlayer', authenticateAdmin, async (request, response) => {
    try {
        console.log("Full request body:", JSON.stringify(request.body, null, 2));
        console.log("Win value:", request.body.Win);
        console.log("Win type:", typeof request.body.Win);


        const requiredFields = [
            'Player',
            'Score',
            'Kills',
            'Deaths',
            'Assists',
            'Team Kills',
            'Blocks',
            'Impact Rating',
            'Regiment',
            'Win',
            'Date'
        ];

        const missingFields = requiredFields.filter(field => {
            console.log(`Checking field ${field}:`, request.body[field]);
            return request.body[field] === undefined || request.body[field] === null;
        });

        if (missingFields.length > 0) {
            return response.status(400).json({
                message: 'Missing required fields',
                missingFields: missingFields
            });
        }

        // Validate numeric fields
        const numericFields = ['Score', 'Kills', 'Deaths', 'Assists', 'Team Kills', 'Blocks', 'Impact Rating'];
        for (const field of numericFields) {
            if (isNaN(request.body[field])) {
                return response.status(400).json({
                    message: `Invalid value for ${field}`,
                    error: `${field} must be a number`
                });
            }
        }

        // Validate date
        if (!Date.parse(request.body.Date)) {
            return response.status(400).json({
                message: 'Invalid date format',
                error: 'Date must be a valid date string'
            });
        }

        const newPlayer = {
            Player: request.body.Player,
            Score: request.body.Score,
            Kills: request.body.Kills,
            Deaths: request.body.Deaths,
            Assists: request.body.Assists,
            "Team Kills": request.body["Team Kills"],
            Blocks: request.body.Blocks,
            "Impact Rating": request.body["Impact Rating"],
            Regiment: request.body.Regiment,
            Win: request.body.Win,
            Date: request.body.Date
        };

        const player = await PickupsStats.create(newPlayer);
        return response.status(201).json({
            message: 'Player record created successfully',
            data: player
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: 'Error creating player record',
            error: error.message
        });
    }
});

// Route to delete a player record by ID
router.delete('/:id', authenticateAdmin, async (request, response) => {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({
                message: "Invalid ID format",
                error: "The provided ID is not a valid MongoDB ObjectId"
            });
        }
        
        const result = await PickupsStats.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({
                message: "Record not found",
                error: "No player record exists with the provided ID"
            });
        }

        return response.status(200).json({
            message: "Record deleted successfully",
            data: result
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: 'Error deleting player record',
            error: error.message
        });
    }
});

router.put('/:id', authenticateAdmin, async (request, response) => {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({
                message: "Invalid ID format",
                error: "The provided ID is not a valid MongoDB ObjectId"
            });
        }

        const requiredFields = [
            'Player',
            'Score',
            'Kills',
            'Deaths',
            'Assists',
            'Team Kills',
            'Blocks',
            'Impact Rating',
            'Regiment',
            'Win',
            'Date'
        ];

        const missingFields = requiredFields.filter(field => {
            return request.body[field] === undefined || request.body[field] === null;
        });

        if (missingFields.length > 0) {
            return response.status(400).json({
                message: 'Missing required fields',
                missingFields: missingFields
            });
        }

        // Validate numeric fields
        const numericFields = ['Score', 'Kills', 'Deaths', 'Assists', 'Team Kills', 'Blocks', 'Impact Rating'];
        for (const field of numericFields) {
            if (isNaN(request.body[field])) {
                return response.status(400).json({
                    message: `Invalid value for ${field}`,
                    error: `${field} must be a number`
                });
            }
        }

        const updatedPlayer = {
            Player: request.body.Player,
            Score: request.body.Score,
            Kills: request.body.Kills,
            Deaths: request.body.Deaths,
            Assists: request.body.Assists,
            "Team Kills": request.body["Team Kills"],
            Blocks: request.body.Blocks,
            "Impact Rating": request.body["Impact Rating"],
            Regiment: request.body.Regiment,
            Win: request.body.Win,
            Date: request.body.Date
        };

        const result = await PickupsStats.findByIdAndUpdate(
            id,
            updatedPlayer,
            { new: true, runValidators: true }
        );

        if (!result) {
            return response.status(404).json({
                message: "Record not found",
                error: "No player record exists with the provided ID"
            });
        }

        return response.status(200).json({
            message: "Record updated successfully",
            data: result
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: 'Error updating player record',
            error: error.message
        });
    }
});

// Route to get all records for a specific player name with pagination
router.get('/player/:playerName', authenticateAdmin, async (request, response) => {
    try {
        const { playerName } = request.params;
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = { 
            Player: { $regex: playerName, $options: 'i' }
        };

        const total = await PickupsStats.countDocuments(query);
        
        const playerRecords = await PickupsStats.find(query)
            .sort({ Date: -1 })
            .skip(skip)
            .limit(limit);

        if (playerRecords.length === 0) {
            return response.status(404).json({
                message: "No records found for this player",
                error: "No matches found for the provided player name"
            });
        }

        return response.status(200).json({
            data: playerRecords,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                currentPage: page,
                limit
            }
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: 'Error fetching player records',
            error: error.message
        });
    }
});

export default router;