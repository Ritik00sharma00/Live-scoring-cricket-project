import { Request, Response } from "express";
import _matchSchema from "../models/matchModel";
import _deliverySchema from "../models/deliveryModel";
import mongoose from "mongoose";

export const createDelivery = async (req: Request, res: Response) => {
  const { legal, wides, noBalls, byes, legByes, overthrows, runs, dismissal } = req.body;
  const matchId = req.params.matchId;

  try {
    const match = await _matchSchema.findById(matchId);

    if (!match) {
      return res.status(400).send({ message: "Match not found" });
    }
      if(runs!=1 || runs!=3)
    { match.currentBatsmen[0].role = match.currentBatsmen[0].role === 'striker' ? 'runner' : 'striker';
      match.currentBatsmen[1].role = match.currentBatsmen[1].role === 'striker' ? 'runner' : 'striker';}

    let extraRunsAdded: number = 0;
    let updatedExtras: any = {
      wides: 0,
      noBalls:0,
      byes: 0,
      legByes: 0,
      overthrows: 0
    };

    switch (true) {
      case wides > 0 && runs > 0:
        
        extraRunsAdded += 1;
        _deliverySchema.legal = false;
        const team = await mongoose.connection.collection('Team').findOne({
          _id: match.teamA, // or match.teamB
          players: {
            $elemMatch: {
              playerId: match.currentBowler
            }
          }
        });
        match.currentTeam.total_runs += runs;
        updatedExtras.wides += runs;
        break;

      case noBalls > 0 && byes > 0:
        // NoBall + Bye
        _matchSchema.currentBatsman.filter((r: any) => r.role === "striker")[0].balls_faced += 1;
        _matchSchema.currentBowler.runs_given += 1;
        extraRunsAdded += 1;
        updatedExtras.noBalls += 1;
        updatedExtras.byes += byes;
        _matchSchema.currentTeam.total_runs += byes + 1;
        break;

      case noBalls > 0 && runs > 0:
        // NoBall + Runs
        _matchSchema.currentBatsman.filter((r: any) => r.role === "striker")[0].balls_faced += 1;
        _matchSchema.currentBowler.runs_given += runs;
        _matchSchema.currentBatsman.filter((r: any) => r.role === "striker")[0].runs += (runs - 1);
        extraRunsAdded += 1;
        updatedExtras.noBalls += 1;
        _matchSchema.currentTeam.total_runs += runs;
        break;

      case noBalls > 0 && legByes > 0:
      
        _matchSchema.currentBatsman.filter((r: any) => r.role === "striker")[0].balls_faced += 1;
        _matchSchema.currentBowler.runs_given += 1;
        extraRunsAdded += 1;
        updatedExtras.noBalls += 1;
        updatedExtras.legByes += legByes;
        _matchSchema.currentTeam.total_runs += legByes + 1;
        break;

      case (legByes > 0 && overthrows > 0) || (byes > 0 && overthrows > 0):
        
        extraRunsAdded += 1;
        updatedExtras.legByes += legByes;
        updatedExtras.byes += byes;
        updatedExtras.overthrows += overthrows;
        _matchSchema.currentTeam.total_runs += legByes + byes + overthrows;
        break;

      case overthrows > 0 && runs > 0:
        
        extraRunsAdded += 1;
        _matchSchema.currentBatsman.filter((r: any) => r.role === "striker")[0].runs += runs;
        _matchSchema.currentTeam.total_runs += runs + overthrows;
        updatedExtras.overthrows += overthrows;
        break;

      case wides > 0:
  
        extraRunsAdded += 1;
        _matchSchema.currentBowler.runs_given += 1;
        _matchSchema.currentTeam.total_runs += 1;
        _deliverySchema.legal = false;
        updatedExtras.wides += 1;
        break;

      case noBalls > 0:
      
        extraRunsAdded += 1;
        _matchSchema.currentBowler.runs_given += 1;
        _matchSchema.currentTeam.total_runs += 1;
        _deliverySchema.legal = false;
        updatedExtras.noBalls += 1;
        break;

      case byes > 0:
      
        _deliverySchema.legal = true;
        updatedExtras.byes += byes;
        _matchSchema.currentTeam.total_runs += byes;
        break;

      case legByes > 0:
        
        updatedExtras.legByes += legByes;
        _matchSchema.currentTeam.total_runs += legByes;
        break;

      case overthrows > 0:
        updatedExtras.overthrows += overthrows;
        _matchSchema.currentTeam.total_runs += overthrows;
        break;

      default:
        _deliverySchema.legal = true;
        break;
    }

    const delivery = new _deliverySchema({
      legal,
      // extras: updatedExtras,
      runs: _deliverySchema.runs + runs + extraRunsAdded,
      dismissal
    });

    await delivery.save(); 
    await _matchSchema.deliveries.push(delivery);
    return res.status(200).json(delivery);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Not valid delivery', error });
  }
};
