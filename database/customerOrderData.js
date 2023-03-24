const pool = require("./db.js");

let customerOrder = {};

customerOrder.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM customer_order ", (error, customerOrders) => {
      if (error) {
        return reject(error);
      }
      return resolve(customerOrders);
    });
  });
};

customerOrder.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM customer_order WHERE order_id= ?",
      [id],
      (error, customerOrder) => {
        if (error) {
          return reject(error);
        }
        return resolve(customerOrder);
      }
    );
  });
};

customerOrder.getByShopId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM customer_order WHERE shop_id= ?",
      [id],
      (error, customerOrders) => {
        if (error) {
          return reject(error);
        }
        return resolve(customerOrders);
      }
    );
  });
};

customerOrder.insertCustomerOrder = (
  shopId,
  customerInfo,
  deliveryMethod,
  orderMethod,
  schedule,
  items,
  paymentMethod,
  totalPrice,
  status
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO customer_order (order_id, shop_id, customer_info, delivery_method, order_method, schedule, date, time, items, payment_method, total_price, status) VALUES (NULL, ?, ?, ?, ?, ?, CURRENT_DATE(), CURRENT_TIME(), ?, ?, ?, ?)",
      [
        shopId,
        customerInfo,
        deliveryMethod,
        orderMethod,
        schedule,
        items,
        paymentMethod,
        totalPrice,
        status,
      ],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.insertId);
      }
    );
  });
};

customerOrder.updateCustomerOrder = (
  customerInfo,
  deliveryMethod,
  orderMethod,
  schedule,
  items,
  paymentMethod,
  totalPrice,
  status,
  orderId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE customer_order SET customer_info= ?, delivery_method= ?, order_method= ?, schedule= ?, items= ?, payment_method= ?, total_price= ?, status= ? WHERE order_id = ?",
      [
        customerInfo,
        deliveryMethod,
        orderMethod,
        schedule,
        items,
        paymentMethod,
        totalPrice,
        status,
        orderId,
      ],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

customerOrder.deleteCustomerOrder = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM customer_order WHERE order_id= ?",
      [id],
      (error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};

module.exports = customerOrder;
