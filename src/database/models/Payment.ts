import {
    Table,
    Column,
    Model,
    DataType,
} from 'sequelize-typescript'

@Table({
    tableName : 'orders',
    modelName : 'Order',
    timestamps : true
})

class Order extends Model{
    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id:string;

    @Column({
        type : DataType.ENUM('cod','khalti','esewa'),
        allowNull : false
    })
    declare paymentMethod : string


    @Column({
        type : DataType.ENUM('paid','unpaid'),
        defaultValue : 'unpaid'
    })
    declare paymentStatus : string

    @Column({
        type : DataType.STRING,
        
    })
    declare pidx : string
}

export default Order

