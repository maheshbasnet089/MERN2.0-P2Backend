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
        type : DataType.STRING,
        allowNull : false,
        validate : {
            len : {
                args : [10,10],
                msg : 'Phone number must be 10 digits'
            }
        }
    })
    declare phoneNumber : string

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    declare shippingAddress : string

    @Column({
        type : DataType.FLOAT,
        allowNull : false
    })
    declare totalAmount : number

    @Column({
        type : DataType.ENUM('pending','cancelled','delivered','ontheway','preparation'),
        defaultValue : 'pending'
    })
    declare orderStatus : string
}

export default Order

