import {Table, Column, Model, DataType, HasOne, HasMany} from 'sequelize-typescript';
import {DriverInfo} from './DriverInfo';
import {Car} from './Car';

export interface UserAttributes{
    id?:number;
    name:string;
    email:string;
    password:string;
    userType:string;
}

@Table({
    tableName: 'User',
    timestamps: true,
    freezeTableName: true,
})

export class User extends Model<UserAttributes>{
    @Column({type: DataType.NUMBER ,primaryKey: true, autoIncrement: true})
    id!: number;

    @Column({type: DataType.STRING, allowNull: true})
    name:string;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    email:string;

    @Column({type: DataType.STRING, allowNull: false})
    password:string;

    @Column({type: DataType.ENUM("driver", "manager"), defaultValue: "driver"})
    userType:string;

    @HasOne(()=>DriverInfo, 'UserId')
    DriverInfo: DriverInfo;

    @HasMany(()=>Car, 'UserId')
    Car:Car;
}


