import { Router } from 'express';
import {
  createMatch,
  getMatch,
  // getMatchById
  // updateMatch,
//   deleteMatch,
} from '../Controllers/MatchController';
import {createDelivery} from '../Controllers/DeliveryController'
const router = Router();

router.post('/create', createMatch);

router.get('/getMatch', getMatch);
router.post('/delivery/:matchId',createDelivery);

//  router.get('/:id', getMatchById);

// router.put('/:id', updateMatch);

// router.delete('/:id', deleteMatch);

export default router;
