import { Request, Response } from 'express';
import _teamSchema from '../models/teamModel';

import mongoose from 'mongoose';
// export const createTeam = async (req: Request, res: Response) => {
//     try {
//         const { teamName, players } = req.body;

//         const newTeam = new _teamSchema({
//             teamName,
//             players
//         });

//         const savedTeam = await newTeam.save();
//         return res.status(201).json(savedTeam);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error creating team', error });
//     }
// };

export const getAllTeams = async (req: Request, res: Response) => {
  try {
      const teams = await _teamSchema.find();
      const teamsWithTotalRuns = teams.map(team => {
          let total_runs = team.players.reduce((acc, player) => acc + player.runs, 0);
          return { ...team.toObject(), total_runs };
      });

      return res.status(200).json(teamsWithTotalRuns);
  } catch (error) {
      return res.status(500).json({ message: 'Error fetching teams', error });
  }
};




export const getTeamById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const team = await _teamSchema.findById(id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        let total_runs = team.players.reduce((acc, player) => acc + player.runs, 0);

        
        const teamWithTotalRuns = { ...team.toObject(), total_runs };

        return res.status(200).json(teamWithTotalRuns);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching team', error });
    }
};




   
  


export const fetchTeamRuns = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;

    const teamsCollection = mongoose.connection.collection('Teams');

    const team = await teamsCollection.findOne({ _id: new mongoose.Types.ObjectId(teamId) });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const totalRuns = team.players.reduce((total: number, player: any) => total + player.runs, 0);

    return res.status(200).json({
      message: 'Total runs fetched successfully',
      teamName: team.teamName,
      totalRuns,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching team runs', error: error.message });
  }
};



// export const updateTeam = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { teamName, players } = req.body;

//         const updatedTeam = await _teamSchema.findByIdAndUpdate(
//             id,
//             { teamName, players, updatedAt: new Date() },
//             { new: true, runValidators: true } // Return the updated document
//         );

//         if (!updatedTeam) {
//             return res.status(404).json({ message: 'Team not found' });
//         }

//         return res.status(200).json(updatedTeam);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error updating team', error });
//     }
// };

// export const deleteTeam = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;

//         const deletedTeam = await _teamSchema.findByIdAndDelete(id);
//         if (!deletedTeam) {
//             return res.status(404).json({ message: 'Team not found' });
//         }

//         return res.status(200).json({ message: 'Team deleted successfully' });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error deleting team', error });
//     }
// };
