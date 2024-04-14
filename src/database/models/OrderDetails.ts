import {
    Table,
    Column,
    Model,
    DataType,
} from 'sequelize-typescript'

@Table({
    tableName : 'orderdetails',
    modelName : 'OrderDetail',
    timestamps : true
})

class OrderDetail extends Model{
    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id:string;

    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    declare quantity : number


}

export default OrderDetail

