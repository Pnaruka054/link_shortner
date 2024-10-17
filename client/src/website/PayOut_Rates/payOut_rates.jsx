import Nav_Bar from "../Nav_Bar/nav_bar";
import "./payOut_rates.css";
import React from "react";
import Footer from "../Footer/footer"

const PayoutRates = () => {
  const payoutData = [
    { country: "United Kingdom", desktop: 2.0, mobile: 2.0 },
    { country: "United States", desktop: 2.0, mobile: 2.0 },
    { country: "Canada", desktop: 1.6, mobile: 1.6 },
    { country: "Worldwide Deal (All Countries)", desktop: 0.4, mobile: 0.4 },
  ];

  return (
    <div>
      <div>
        <Nav_Bar />
      </div>
      <div id="payout_rates" className="container">
        <h2 className="text-center">Payout Rates</h2>
        <table className="table table-bordered mt-4">
          <thead className="thead-dark">
            <tr>
              <th>Country</th>
              <th>Earnings per 1000 Views (Desktop)</th>
              <th>Earnings per 1000 Views (Mobile / Tablet)</th>
            </tr>
          </thead>
          <tbody>
            {payoutData.map((item, index) => (
              <tr key={index}>
                <td>{item.country}</td>
                <td>${item.desktop.toFixed(2)}</td>
                <td>${item.mobile.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayoutRates;
