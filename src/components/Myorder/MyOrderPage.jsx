import React, { useEffect } from "react";
import "./MyOrderPage.css";
import Table from "../Common/Table";

import useData from "../../hooks/useData";
import Loader from "../Common/Loader";

const MyOrderPage = () => {
  const { data: orders, error, isLoading } = useData("/order");

  const getProductString = (order) => {
    const productsStringArr = order.products.map(
      (p) => `${p.product.title} (${p.quantity})`
    );
    return productsStringArr.join(", ");
  };
  return (
    <section className="align_center my_order_page">
      {isLoading && <Loader />}
      {error && <em className="form_error">{error}</em>}
      {orders && (
        <Table headings={["Order", "Products", "Total", "Status"]}>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{getProductString(order)}</td>
                  <td> ${order.total}</td>
                  <td>{order.status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </section>
  );
};

export default MyOrderPage;
