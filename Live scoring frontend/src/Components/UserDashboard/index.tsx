import React, { useState } from 'react';
import {
  Container, Typography, Card, CardContent, Box, Button, Grid,
} from '@mui/material';
import './style.css';
import CreateMatchDialog from '../CreateMatch';

const AdminDashboard: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [openCreateMatch, setOpenCreateMatch] = useState<boolean>(false);

  // State to hold score and match details for each match
  const [matchScoreData, setMatchScoreData] = useState<Record<number, any>>({
    1: {
      batsmen: [{ name: 'Virat Kohli', runs: 50, balls: 30 }],
      bowler: { name: 'Mitchell Starc', overs: 4.0, ballsBowled: 24, runs: 30, wickets: 2 },
      status: 'Not Started',
      totalOvers: 20,
      totalBalls: 120, // 20 overs * 6 balls
      currentBalls: 0, // Number of balls bowled
    },
  });

  const handleOpenCreateMatch = () => setOpenCreateMatch(true);
  const handleCloseCreateMatch = () => setOpenCreateMatch(false);

  // Add new match
  const handleCreateMatch = (matchDetails: { team1: string; team2: string; matchType: string }) => {
    const newMatch = {
      id: matches.length + 1,
      team1: matchDetails.team1,
      team2: matchDetails.team2,
      status: 'Not Started',
      totalOvers: matchDetails.matchType === 'T20' ? 20 : matchDetails.matchType === 'ODI' ? 50 : 90, // For simplicity
      totalBalls: matchDetails.matchType === 'T20' ? 120 : matchDetails.matchType === 'ODI' ? 300 : 540, // 6 balls per over
    };
    setMatches([...matches, newMatch]);
    setMatchScoreData({
      ...matchScoreData,
      [newMatch.id]: { batsmen: [{ name: '', runs: 0, balls: 0 }], bowler: { name: '', overs: 0, ballsBowled: 0, runs: 0, wickets: 0 }, status: 'Not Started', currentBalls: 0 },
    });
    handleCloseCreateMatch();
  };

  // Start/End Match Function
  const handleMatchStatusChange = (matchId: number, newStatus: string) => {
    setMatchScoreData((prevData) => ({
      ...prevData,
      [matchId]: {
        ...prevData[matchId],
        status: newStatus,
      },
    }));
  };

  // Update score (Run, Wide, No Ball, Wicket)
  const handleScoreUpdate = (matchId: number, updateType: string) => {
    setMatchScoreData((prevData) => {
      const matchData = { ...prevData[matchId] };

      if (updateType === 'Run') {
        matchData.batsmen[0].runs += 1;
        matchData.batsmen[0].balls += 1;
        matchData.bowler.runs += 1;
        matchData.currentBalls += 1;
        matchData.bowler.ballsBowled += 1;
      } else if (updateType === 'Wide') {
        matchData.bowler.runs += 1; // Extra run for wide
        // No ball faced for batsman, doesn't increase current balls
      } else if (updateType === 'No Ball') {
        matchData.bowler.runs += 1; // Extra run for no ball
        // No ball faced for batsman
      } else if (updateType === 'Wicket') {
        matchData.bowler.wickets += 1;
        matchData.bowler.ballsBowled += 1;
        matchData.currentBalls += 1;
      }

      // Handle Over Completion
      if (matchData.bowler.ballsBowled % 6 === 0 && matchData.bowler.ballsBowled !== 0) {
        matchData.bowler.overs = Math.floor(matchData.bowler.ballsBowled / 6);
      }

      return { ...prevData, [matchId]: matchData };
    });
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Cricket Admin Dashboard
      </Typography>

      {/* Create Match Button */}
      <Box textAlign="center" mb={3}>
        <Button variant="contained" color="primary" onClick={handleOpenCreateMatch} style={{ borderRadius: '20px', padding: '10px 30px' }}>
          Create Match
        </Button>
      </Box>

      <Grid container spacing={3}>
        {matches.map((match) => (
          <Grid item xs={12} sm={6} key={match.id}>
            <Card style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  {match.team1} vs {match.team2}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Status: {matchScoreData[match.id]?.status}
                </Typography>

                {/* Display Batsman and Bowler Information */}
                <Typography variant="body2" gutterBottom>
                  Batsman: {matchScoreData[match.id]?.batsmen[0]?.name || 'N/A'} - {matchScoreData[match.id]?.batsmen[0]?.runs} ({matchScoreData[match.id]?.batsmen[0]?.balls})
                </Typography>
                <Typography variant="body2">
                  Bowler: {matchScoreData[match.id]?.bowler?.name || 'N/A'} - {matchScoreData[match.id]?.bowler?.overs} overs, {matchScoreData[match.id]?.bowler?.runs} runs, {matchScoreData[match.id]?.bowler?.wickets} wickets
                </Typography>

                {/* Action Buttons */}
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleScoreUpdate(match.id, 'Run')}
                    style={{ marginRight: '10px' }}
                    disabled={matchScoreData[match.id]?.status !== 'In Progress'}
                  >
                    Normal Run
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleScoreUpdate(match.id, 'Wide')}
                    style={{ marginRight: '10px' }}
                    disabled={matchScoreData[match.id]?.status !== 'In Progress'}
                  >
                    Wide
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#FF5722', color: '#fff', marginRight: '10px' }}
                    onClick={() => handleScoreUpdate(match.id, 'No Ball')}
                    disabled={matchScoreData[match.id]?.status !== 'In Progress'}
                  >
                    No Ball
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleScoreUpdate(match.id, 'Wicket')}
                    disabled={matchScoreData[match.id]?.status !== 'In Progress'}
                  >
                    Wicket
                  </Button>
                </Box>

                {/* Match Start and End Buttons */}
                <Box mt={2}>
                  {matchScoreData[match.id]?.status === 'Not Started' && (
                    <Button variant="contained" color="success" onClick={() => handleMatchStatusChange(match.id, 'In Progress')}>
                      Start Match
                    </Button>
                  )}
                  {matchScoreData[match.id]?.status === 'In Progress' && (
                    <Button variant="contained" color="error" onClick={() => handleMatchStatusChange(match.id, 'Ended')}>
                      End Match
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Match Dialog */}
      <CreateMatchDialog open={openCreateMatch} onClose={handleCloseCreateMatch} onCreate={handleCreateMatch} />
    </Container>
  );
};

export default AdminDashboard;
