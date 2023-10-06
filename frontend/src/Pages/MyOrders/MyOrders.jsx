import React, { useEffect } from "react";
import { getCurrUserOrders } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import "./MyOrders.css"

const MyOrders = () => {
  const { myOrders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrUserOrders());
  }, []);

  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 150, flex: 0.9 },
    {
      field: "orderItems",
      headerName: "Order Items",
      minWidth: 150,
      flex: 0.8,
      renderCell: (params) => {
        return <div>
            {params.row.orderItems.map((item) => {
                return <p>{item}</p>
            })}
        </div>
      }
    },
    {
      field: "quantity",
      headerName: "Qty",
      minWidth: 80,
      flex: 0.3,
      renderCell: (params) => {
        return <div>
            {params.row.quantity.map((item) => {
                return <p>x {item}</p>
            })}
        </div>
      }
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 110,
      flex: 0.5,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      minWidth: 110,
      flex: 0.5,
      cellClassName: (params) => {
        return (
        params.row.orderStatus === "delivered" ? "greenColor" : "redColor"
        )
      }
    },
    {
      field: "shippingInfo",
      headerName: "Shipping Address",
      minWidth: 200,
      flex: 1,
    },
  ];

  const rows = myOrders ? myOrders.map((order) => {
    return {
        id: order._id,
        orderItems: order.orderItems.map((item) => item.name),
        quantity: order.orderItems.map((item) => item.quantity),
        amount: order.totalPrice,
        orderStatus: order.orderStatus.status,
        shippingInfo: order.shippingInfo.address,
    }
  }) : [];

  console.log(myOrders);
  return (
    <div className="my-orders-main-container">
      <div className="data-grid-container">
        <DataGrid
          getRowHeight={() => 'auto'}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default MyOrders;
