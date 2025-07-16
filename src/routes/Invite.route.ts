import express from 'express';
import {
  inviteUser,
  getAllInvitedUsers,
  resendInvite,
  updateInvitedUser, 
  deleteInvitedUser
} from '../controllers/invite.controller';

const router = express.Router();

router.post('/invite', inviteUser);
router.get('/invite', getAllInvitedUsers);
router.post('/invite/resend/:uuid', resendInvite);
router.put('/invite/:uuid', updateInvitedUser); 
router.delete('/invite/:uuid', deleteInvitedUser);

export default router;
