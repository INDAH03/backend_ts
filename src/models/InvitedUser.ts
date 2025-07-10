import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface InvitedUserAttributes {
  uuid: string;
  name: string;
  email: string;
  role: string;
  project: string;
  invitedAt: Date;
}

interface InvitedUserCreationAttributes extends Optional<InvitedUserAttributes, 'uuid' | 'invitedAt'> {}

class InvitedUser extends Model<InvitedUserAttributes, InvitedUserCreationAttributes>
  implements InvitedUserAttributes {
  public uuid!: string;
  public name!: string;
  public email!: string;
  public role!: string;
  public project!: string;
  public invitedAt!: Date;

}

InvitedUser.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  project: {
    type: DataTypes.STRING,
    allowNull: false
  },
  invitedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'InvitedUser',
  tableName: 'invited_users',
  timestamps: true
});

export default InvitedUser;
