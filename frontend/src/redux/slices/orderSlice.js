import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [
    {
      id: 12345,
      date: "Apr 10 2024",
      customer: {
        name: "Rajesh Kannan",
        phone: "+91 8526547512",
        address: "RS Puram,Coimbatore",
      },
      payment: "PAID-UPI",
      total: 150,
      status: "confirmation",
      items: [
        {
          id: 1,
          name: "Ooty Apple",
          quantity: 1,
          price: 100,
        },
        {
          id: 2,
          name: "White Egg",
          quantity: 5,
          price: 50,
        },
      ],
    },
    {
      id: 12305,
      date: "Apr 10 2024",
      customer: {
        name: "Rajesh Kannan",
        phone: "+91 8526547512",
        address: "RS Puram,Coimbatore",
      },
      payment: "PAID-UPI",
      total: 150,
      status: "confirmation",
      items: [
        {
          id: 1,
          name: "Ooty Apple",
          quantity: 1,
          price: 100,
        },
        {
          id: 2,
          name: "White Egg",
          quantity: 5,
          price: 50,
        },
      ],
    },
    {
      id: 12346,
      date: "Apr 10 2024",
      customer: {
        name: "Rajesh Kannan",
        phone: "+91 8526547512",
        address: "RS Puram,Coimbatore",
      },
      payment: "PAID-UPI",
      total: 150,
      status: "confirmation",
      items: [
        {
          id: 1,
          name: "Ooty Apple",
          quantity: 1,
          price: 100,
        },
        {
          id: 2,
          name: "White Egg",
          quantity: 5,
          price: 50,
        },
      ],
    },
    {
      id: 12347,
      date: "Apr 10 2024",
      customer: {
        name: "Rajesh Kannan",
        phone: "+91 8526547512",
        address: "RS Puram,Coimbatore",
      },
      payment: "PAID-UPI",
      total: 150,
      status: "confirmation",
      items: [
        {
          id: 1,
          name: "Ooty Apple",
          quantity: 1,
          price: 100,
        },
        {
          id: 2,
          name: "White Egg",
          quantity: 5,
          price: 50,
        },
      ],
    },
  ],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    confirmOrder: (state, action) => {
      const order = state.orders.find((o) => o.id === action.payload);

      if (order) {
        order.status = "preparing";
      }
    },
    rejectOrder: (state, action) => {
      const order = state.orders.filter((o) => o.id !== action.payload);
    },
    packOrder: (state, action) => {
      const order = state.orders.find((o) => o.id === action.payload);

      if (order) {
        order.status = "packed";
      }
    },

    completeOrder: (state, action) => {
      const order = state.orders.find((o) => o.id === action.payload);
      if (order) {
        order.status = "completed";
      }
    },
  },
});

export const { confirmOrder, rejectOrder, packOrder, completeOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
