import {Table, Column, Model, DataType, ForeignKey, NotEmpty, BelongsTo} from 'sequelize-typescript';

import { User } from './User';

@Table({
    tableName: 'DriverInfo',
    timestamps: false,
    freezeTableName: true,
})
export class DriverInfo extends Model{
    @BelongsTo(()=>User, 'UserId')
    User:User;

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER, allowNull: true})
    UserId:number;
    
    @NotEmpty
    @Column({type: DataType.STRING, allowNull: false})
    home_location:string;
}