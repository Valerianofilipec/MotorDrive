import {Table, Column, Model, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { User } from './User';
import { ICreateCarDTO } from '../controllers/repositories/Car/ICarRepository';

@Table({
    tableName: 'Car',
    timestamps: true,
    freezeTableName: true,
})
export class Car extends Model<ICreateCarDTO>{
    @Column({type: DataType.STRING, allowNull: true})
    brand:string;

    @Column({type: DataType.STRING, allowNull:false})
    model:string;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    plate_number:string;

    @ForeignKey(()=>User)
    @Column(DataType.INTEGER)
    UserId:number;

    @Column({type: DataType.DECIMAL, defaultValue:41.1663061, allowNull: false})
    longitude:number;

    @Column({type: DataType.DECIMAL, defaultValue:-8.6490692, allowNull: false})
    latitude:number;

    @BelongsTo(()=>User, 'UserId')
    User:User;
}