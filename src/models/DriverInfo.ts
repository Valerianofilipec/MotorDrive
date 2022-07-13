import { Model, DataTypes, Optional} from 'sequelize';
import { sequelize } from '.';

import { User } from './User';

interface DriverInfoAttributes {
    home_location:string;
    UserId?:number;
};

interface DriverInfoCreationAttributes extends Optional<DriverInfoAttributes, 'UserId'>{};

interface DriverInfoInstance extends Model<DriverInfoAttributes, DriverInfoCreationAttributes>, DriverInfoAttributes{
    id?:number;
};

const DriverInfo = sequelize.define<DriverInfoInstance>('DriverInfo',{
    UserId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'User',
        key:'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    home_location:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{
    timestamps: false,
    freezeTableName: true,
});

DriverInfo.belongsTo(User,{foreignKey: 'UserId'});

/*
@Table({
    tableName: 'DriverInfo',
    timestamps: false,
    freezeTableName: true,
})
class DriverInfo extends Model{
    @BelongsTo(()=>User, 'UserId')
    user:User;

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER, allowNull: true})
    UserId:number;
    
    @NotEmpty
    @Column({type: DataType.STRING, allowNull: false})
    home_location:string;
}
*/
export {DriverInfo};