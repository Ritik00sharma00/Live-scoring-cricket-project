import { Request, response, Response } from 'express';
import _matchSchema from '../models/matchModel';
import _overSchema from '../models/overModel';
import _deliverySchema from '../models/deliveryModel';
import mongoose from 'mongoose';

export const createMatch = async (req: Request, res: Response) => {
    try {
        const { matchName, matchType, teamA,teamB, currentTeam,striker,runner,currentBowler,matchStatus} = req.body;
       
         const currentBatsmen = [
            { playerId: striker, role: 'striker' },
            { playerId: runner, role: 'runner' }
        ];

        const newMatch = new _matchSchema({
            matchName,
            matchType,
            teamA,
            teamB,
            currentTeam,
            currentBatsmen:[ { playerId: striker, role: 'striker' },
                { playerId: runner, role: 'runner' }],
            currentBowler,
            matchStatus
        });
         

        const savedMatch = await newMatch.save();
        return res.status(200).json(savedMatch);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error creating match', error });
    }
};

export const getMatch = async (req: Request, res: Response) => {
    try {
        const { matchId } = req.params;
        const match = await _matchSchema.findById(matchId);

        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        return res.status(200).json(match);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching match', error });
    }
};

export const updateMatch = async (req: Request, res: Response) => {
    try {
        const { matchId } = req.params;
        
        eachOverComplete(req,res);
        const updates = req.body;
         
        const updatedMatch = await _matchSchema.findByIdAndUpdate(matchId, updates, { new: true });
     
        if (!updatedMatch) {
            return res.status(404).json({ message: 'Match not found' });
        }

        return res.status(200).json(updatedMatch);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating match', error });
    }
};





export const eachOverComplete = async (req: Request, res: Response) => {
    try {
        const { matchId } = req.params;
        const { newBowlerId } = req.params;

        const match = await _matchSchema.findById(matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        
        if (match.currentBatsmen.length !== 2) {
            return res.status(400).json({ message: 'There must be exactly 2 batsmen to swap' });
        }

        if(match.deliveries.length%6==0)
       { match.currentBatsmen[0].role = match.currentBatsmen[0].role === 'striker' ? 'runner' : 'striker';
         match.currentBatsmen[1].role = match.currentBatsmen[1].role === 'striker' ? 'runner' : 'striker';
         changeBowler(req, res);
       }
       
    
        const updatedMatch = await match.save();
        return res.status(200).json(updatedMatch);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error swapping striker and runner', error });
    }
};



export const changeBowler = async (req: Request, res: Response) => {
    const { matchId } = req.body; // matchId comes from the request body
    const { newBowlerId } = req.params; // newBowlerId comes from the request parameters
  
    try {const match = await _matchSchema.findById(matchId).populate({
      path: 'teamA',
      populate: { path: 'players' }
    }).populate({
      path: 'teamB',
      populate: { path: 'players' }
    });
      
      if (!match) {
        return res.status(404).json({ message: 'Match not found' });
      }
    
      // const isBowlerInTeamA = match.teamA.players.some((player: any) => player._id.toString() === newBowlerId);
      // const isBowlerInTeamB = match.teamB.players.some((player: any) => player._id.toString() === newBowlerId);
  
      //  if (!isBowlerInTeamA && !isBowlerInTeamB) {
      //   return res.status(400).json({ message: 'Bowler does not belong to either team' });
      //  }
  
      // Update the currentBowler field with the new bowler's playerId
      match.currentBowler = new mongoose.Types.ObjectId(newBowlerId);

      // Save the updated match
      await match.save();
  
      return res.status(200).json({
        message: 'Current bowler updated successfully',
        match: match
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to update bowler', error });
    }
  };


export const getFilteredDeliveries = async (req: Request, res: Response) => {
  const matchId = req.params.matchId;

  try {
    // Find the match and populate the deliveries
    const match = await _matchSchema.findById(matchId)
      .populate({
        path: 'deliveries',
        model: _deliverySchema
      });

    if (!match) {
      return res.status(404).send({ message: "Match not found" });
    }

    
    // const filteredDeliveries = match.deliveries.filter(delivery => delivery. === true);

    return res.status(200).json("");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error fetching deliveries', error });
  }
};


export const completeMatch = async (req: Request, res: Response) => {
    try {
        const { matchId } = req.params;

        const match = await _matchSchema.findById(matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        match.matchStatus = 'completed';
        await match.save();

        return res.status(200).json({ message: 'Match completed successfully', match });
    } catch (error) {
        return res.status(500).json({ message: 'Error completing match', error });
    }
};
