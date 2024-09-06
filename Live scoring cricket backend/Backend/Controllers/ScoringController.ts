import { Schema, model, Document, Types } from 'mongoose'; // Mongoose types and functions
import _matchSchema from '../models/matchModel'; // Importing the Match model
import _deliverySchema from '../models/deliveryModel'; // Importing the Delivery model

// Interface imports
import { Delivery } from '../Interfaces/deliveryInterface'; 

const handleWideWithRuns = (delivery, match, bowler, team) => {
    team.extras.wides += delivery.runs;  
    team.total_runs += delivery.runs;   
    bowler.runs_given += delivery.runs;  
};


const handleNoBallWithBye = (delivery, match, bowler, batsman, team) => {
    batsman.balls_faced += 1;  // Increase balls faced
    bowler.runs_given += 1; // Bowler concedes 1 run
    team.total_runs += delivery.runs; // Add all runs to the team
    team.extras.noBalls += 1;  // 1 run to no-balls
    team.extras.byes += delivery.runs - 1; // Remaining runs as byes
};


const handleNoBallWithRuns = (delivery, match, bowler, batsman, team) => {
    batsman.balls_faced += 1;  // Increase balls faced
    batsman.runs += delivery.runs - 1;  // Credit runs (excluding 1 for no-ball)
    bowler.runs_given += delivery.runs;  // Bowler concedes all runs
    team.total_runs += delivery.runs;  // Add all runs to team
    team.extras.noBalls += 1;  // 1 run to no-balls in extras
};


const handleNoBallWithLegBye = (delivery, match, bowler, batsman, team) => {
    batsman.balls_faced += 1;  // Increase balls faced
    bowler.runs_given += 1;  // Bowler concedes only 1 run
    team.total_runs += delivery.runs;  // All runs added to team
    team.extras.noBalls += 1;  // 1 run to no-ball
    team.extras.legByes += delivery.runs - 1;  // Remaining runs as leg-byes
};


const handleLegByeOrByeWithOverthrow = (delivery, match, team) => {
    if (delivery.deliveryType === 'bye') {
        team.extras.byes += delivery.runs;
    } else if (delivery.deliveryType === 'leg-bye') {
        team.extras.legByes += delivery.runs;
    }
    team.total_runs += delivery.runs;  
};

const handleRunsWithOverthrow = (delivery, match, batsman, team) => {
    batsman.runs += delivery.runs;  // Credit all runs to batsman
    team.total_runs += delivery.runs;  // Add to team total
};


const processDelivery = async (deliveryData, matchId, bowlerId, batsmanId) => {
    const match = await _matchSchema.findById(matchId);
    const team = match.currentTeam; // The current batting team
    const bowler = team.players.find((p: { playerId: any; }) => p.playerId === bowlerId);
    const batsman = team.players.find((p: { playerId: any; }) => p.playerId === batsmanId);
    
    const newDelivery = new _deliverySchema(deliveryData);
    await newDelivery.save();
    
    switch (deliveryData.deliveryType) {
        case 'wide':
            handleWideWithRuns(newDelivery, match, bowler, team);
            break;
        case 'no-ball':
            if (newDelivery.extras.byes > 0) {
                handleNoBallWithBye(newDelivery, match, bowler, batsman, team);
            } else if (newDelivery.extras.legByes > 0) {
                handleNoBallWithLegBye(newDelivery, match, bowler, batsman, team);
            } else {
                handleNoBallWithRuns(newDelivery, match, bowler, batsman, team);
            }
            break;
        case 'bye':
        case 'leg-bye':
            handleLegByeOrByeWithOverthrow(newDelivery, match, team);
            break;
        case 'normal':
            handleRunsWithOverthrow(newDelivery, match, batsman, team);
            break;
    }
    
    await match.save();
};
