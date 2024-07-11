import OrderItem from "../../domain/checkout/items";
import Order from "../../domain/checkout/order";
import OrderRepositoryInterface from "../../domain/repository/order";
import ItemModel from "../db/sequelize/model/items";
import OrderModel from "../db/sequelize/model/order";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(order: Order): Promise<void> {
        await OrderModel.create(
            {
                id: order.id,
                customer_id: order.customer_id,
                total: order.total(),
                items: order.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.product_id,
                    quantity: item.quantity,
                }))
            },
            {
                include: [{ model: ItemModel }]
            }
        );
    };

    // I'm pretty sure that this could be improved...
    async update(order: Order): Promise<void> {
        const orderItems = order.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.product_id,
            quantity: item.quantity,
        }));

        const itemsModel = await ItemModel.findAll({ where: { order_id: order.id } });

        const items = orderItems.filter(
            updatedItem => !itemsModel.some(itemOnDB => itemOnDB.id === updatedItem.id)
        );

        try {
            await Promise.all(items.map(
                newItem => ItemModel.create({ ...newItem, order_id: order.id })
            ));
        } catch (error) {
            console.error("Error creating new items:", error);
        }

        const deletedItems = itemsModel.filter(
            itemOnDB => !orderItems.some(updatedItem => updatedItem.id === itemOnDB.id)
        );

        try {
            await Promise.all(deletedItems.map(
                removedItem => ItemModel.destroy({ where: { id: removedItem.id } })
            ));
        } catch (error) {
            console.error("Error creating new items:", error);

        }

        await OrderModel.update({ customer_id: order.customer_id, total: order.total() }, { where: { id: order.id } });
    }

    async find(id: string): Promise<Order> {
        const model = await OrderModel.findOne({
            where: { id },
            include: [{ model: ItemModel }]
        });

        const order = new Order(
            model.id,
            model.customer_id,
            model.items.map((item) => new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
            ))
        );
        
        return order;
    }

    async list(): Promise<Order[]> {
        const models = await OrderModel.findAll({
            include: [{ model: ItemModel }]
        });

        const orders = models.map((order) => new Order(
            order.id,
            order.customer_id,
            order.items.map((item) => new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
            ))
        ));

        return orders;
    }

}