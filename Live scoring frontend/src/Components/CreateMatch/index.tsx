import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Button,
  Grid
} from '@mui/material';

interface CreateMatchDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (matchDetails: { team1: string; team2: string; matchType: string }) => void;
}

const teams = ['India', 'Australia', 'England', 'South Africa', 'Pakistan', 'New Zealand', 'Sri Lanka', 'West Indies', 'Bangladesh', 'Zimbabwe'];
const matchTypes = ['Test', 'ODI', 'T20'];

const CreateMatchDialog: React.FC<CreateMatchDialogProps> = ({ open, onClose, onCreate }) => {
  const [matchDetails, setMatchDetails] = React.useState({
    team1: '',
    team2: '',
    matchType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMatchDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateMatch = () => {
    onCreate(matchDetails);
    onClose(); // Close the dialog after creating the match
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Match</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select two teams and the type of match to create a new match.
        </DialogContentText>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Select Team 1"
              name="team1"
              value={matchDetails.team1}
              onChange={handleChange}
              fullWidth
            >
              {teams.map((team) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Select Team 2"
              name="team2"
              value={matchDetails.team2}
              onChange={handleChange}
              fullWidth
            >
              {teams.map((team) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Select Match Type"
              name="matchType"
              value={matchDetails.matchType}
              onChange={handleChange}
              fullWidth
            >
              {matchTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreateMatch} color="primary" variant="contained">
          Create Match
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMatchDialog;
