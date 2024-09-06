import { Request, Response } from 'express';
import _playerSchema from '../models/playerModel';

export const createPlayer = async (req: Request, res: Response) => {
    try {
        const { playerName, playerRole, playerImage } = req.body;

        const newPlayer = new _playerSchema({
            playerName,
            playerRole
        });

        const savedPlayer = await newPlayer.save();
        return res.status(201).json(savedPlayer);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating player', error });
    }
};

export const getAllPlayers = async (req: Request, res: Response) => {
    try {
        const players = await _playerSchema.find();
        return res.status(200).json(players);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching players', error });
    }
};

export const getPlayerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const player = await _playerSchema.findById(id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        return res.status(200).json(player);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching player', error });
    }
};

export const updatePlayer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { playerName, playerRole, playerImage } = req.body;

        const updatedPlayer = await _playerSchema.findByIdAndUpdate(
            id,
            { playerName, playerRole, playerImage, updatedAt: new Date() },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }

        return res.status(200).json(updatedPlayer);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating player', error });
    }
};

export const deletePlayer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedPlayer = await _playerSchema.findByIdAndDelete(id);
        if (!deletedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }

        return res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting player', error });
    }
};
