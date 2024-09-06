import { Request, Response } from 'express';
import _matchSchema from '../models/matchModel';
import _overSchema from '../models/overModel';
import _deliverySchema from '../models/deliveryModel';

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



// export const addDelivery = async (req: Request, res: Response) => {
//   try {
//     const { matchId } = req.params;
//     const { deliveryType, runs, overthrows, extras, dismissal } = req.body;

//     const newDelivery = new _deliverySchema({
//       matchId,
//       deliveryType,
//       runs,
//       overthrows,
//       extras,
//       dismissal,
//     });

//     const savedDelivery = await newDelivery.save();

//     const match = await _matchSchema.findById(matchId);
//     if (!match) {
//       return res.status(404).json({ message: 'Match not found' });
//     }

//     match.deliveries.push(savedDelivery._id);
//     match.extras.wides += extras.wides;
//     match.extras.noBalls += extras.noBalls;
//     match.extras.byes += extras.byes;
//     match.extras.legByes += extras.legByes;
//     match.extras.overthrows += extras.overthrows;

//     await match.save();

//     return res.status(201).json(savedDelivery);
//   } catch (error) {
//     return res.status(500).json({ message: 'Error adding delivery', error });
//   }
// };


export const swapStrikerAndRunner = async (req: Request, res: Response) => {
    try {
        const { matchId } = req.params;

        // Find the match document by ID
        const match = await _matchSchema.findById(matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        
        if (match.currentBatsmen.length !== 2) {
            return res.status(400).json({ message: 'There must be exactly 2 batsmen to swap' });
        }


        match.currentBatsmen[0].role = match.currentBatsmen[0].role === 'striker' ? 'runner' : 'striker';
        match.currentBatsmen[1].role = match.currentBatsmen[1].role === 'striker' ? 'runner' : 'striker';

    
        const updatedMatch = await match.save();
        return res.status(200).json(updatedMatch);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error swapping striker and runner', error });
    }
};




export const changeBowler = async (req: Request, res: Response) => {
    try {
        const { matchId } = req.params;
        const { newBowlerId } = req.body; 
 
        const match = await _matchSchema.findById(matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        if (!newBowlerId) {
            return res.status(400).json({ message: 'New bowler ID is required' });
        }

        match.currentBowler = newBowlerId;

        const updatedMatch = await match.save();
        return res.status(200).json(updatedMatch);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error changing bowler', error });
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
