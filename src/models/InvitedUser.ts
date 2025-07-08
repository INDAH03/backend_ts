import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface InvitedUserAttributes {
  uuid: string;
  name: string;
  email: string;
  role: string;
  project: string;
  action: string;     
  invitedAt: Date;
}

interface InvitedUserCreationAttributes extends Optional<InvitedUserAttributes, 'uuid' | 'action' | 'invitedAt'> {}

class InvitedUser extends Model<InvitedUserAttributes, InvitedUserCreationAttributes> implements InvitedUserAttributes {
  public uuid!: string;
  public name!: string;
  public email!: string;
  public role!: string;
  public project!: string;
  public action!: string;
  public invitedAt!: Date;
}

InvitedUser.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  role: DataTypes.STRING,
  project: DataTypes.STRING,
  action: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
  invitedAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'InvitedUser',
  tableName: 'invited_users',
  timestamps: true
});

export default InvitedUser;
