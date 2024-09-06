import { Router } from 'express';
import {
  createMatch,
  getMatch,
//   getMatchById,
  updateMatch,
//   deleteMatch,
} from '../Controllers/MatchController';

const router = Router();

router.post('/', createMatch);

router.get('/', getMatch);

// router.get('/:id', getMatchById);

router.put('/:id', updateMatch);

// router.delete('/:id', deleteMatch);

export default router;
