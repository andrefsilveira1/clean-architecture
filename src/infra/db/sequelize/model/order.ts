import { Model, Column, HasMany, PrimaryKey, Table, ForeignKey, BelongsTo, AllowNull } from "sequelize-typescript";
import CustomerModel from "./customer";
import ItemModel from "./items";

@Table({
    tableName: "orders",
    timestamps: false,
})

export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({allowNull: false})
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @Column({ allowNull: false })
    declare total: number;

    @HasMany(() => ItemModel)
    declare items: ItemModel[];
    
}