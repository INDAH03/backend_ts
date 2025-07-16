import { Request, Response } from 'express';
import InvitedUser from '../models/InvitedUser';
import sequelize from '../config/database';

export const inviteUser = async (req: Request, res: Response): Promise<void> => {
  const { email, role, project } = req.body;

  const generateNameFromEmail = (email: string): string => {
    const prefix = email.split('@')[0];
    return prefix
      .split(/[._-]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const name = generateNameFromEmail(email);

  try {
    const user = await InvitedUser.create({
      name,
      email,
      role,
      project,
      invitedAt: new Date()
    });
    res.status(201).json(user);
  } catch (err) {
    console.error('Invite Error:', err);
    res.status(500).json({ message: 'Invite failed', error: err });
  }
};

export const getAllInvitedUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await InvitedUser.findAll();
  res.json(users);
};

export const resendInvite = async (req: Request, res: Response): Promise<void> => {
  const { uuid } = req.params;
  try {
    const user = await InvitedUser.findByPk(uuid);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ message: `Invite resent to ${user.email}` });
  } catch (err) {
    res.status(500).json({ message: 'Resend failed', error: err });
  }
};

export const updateInvitedUser = async (req: Request, res: Response): Promise<void> => {
  const { uuid } = req.params;
  console.log('Incoming update payload:', req.body);
  const { name, email, role } = req.body;

  try {
    const user = await InvitedUser.findByPk(uuid);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // hanya update field yang ada
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (role !== undefined) user.role = role;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ message: 'Update user failed', error: err });
  }
};

export const deleteInvitedUser = async (req: Request, res: Response): Promise<void> => {
  const { uuid } = req.params;
  try {
    const deleted = await InvitedUser.destroy({ where: { uuid } });
    if (!deleted) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err });
  }
};
