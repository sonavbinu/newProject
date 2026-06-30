import { CreditCard, ChartColumn, History, Gift } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div>
        <h2>Quick Actions</h2>
        <div className="grid ">
          <div>
            <CreditCard />
            <p>Make Payment</p>
          </div>
          <div>
            <ChartColumn />
            <p>Settlements</p>
          </div>{" "}
          <div>
            <History />
            <p>Transaction History</p>
          </div>{" "}
          <div>
            <Gift />
            <p>Gift Cards</p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
