import React from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FloristDashboard = () => {
  const orders = [
    { id: "BLB123123", buyer: "Arlene McCoy", sub: "Floyd Miles", product: "Customized", status: "Pesanan Selesai", type: "Done" },
    { id: "BLB123124", buyer: "Arlene McCoy", sub: "Floyd Miles", product: "Buket Lili", status: "Pesanan Dikirim", type: "Shipping" },
    { id: "BLB123125", buyer: "Arlene McCoy", sub: "Floyd Miles", product: "Customized", status: "Pesanan Selesai", type: "Done" },
    { id: "BLB123126", buyer: "Arlene McCoy", sub: "Floyd Miles", product: "Buket Lili", status: "Pesanan Selesai", type: "Done" },
    { id: "BLB123127", buyer: "Arlene McCoy", sub: "Floyd Miles", product: "Customized", status: "Pesanan Selesai", type: "Done" },
  ];

  return (
    <div className="FloristDashboardContainer">
      <h1 className="FloristDashboardTitle">Dashboard</h1>

      <div className="FloristStatsGrid">
        <div className="FloristStatCard FloristSageBackground">
          <div className="FloristStatCircle">20</div>
          <p className="p1 txt-color-white">Pesanan Selesai</p>
        </div>
        <div className="FloristStatCard FloristRoseBackground">
          <div className="FloristStatCircle">20</div>
          <p className="p1 txt-color-white">Pesanan Berjalan</p>
        </div>
        <div className="FloristStatCard FloristTanBackground">
          <div className="FloristStatCircle">20</div>
          <p className="p1 txt-color-white">Pesanan Dikirim</p>
        </div>
      </div>

      <div className="FloristOrdersTableSection">
        <div className="FloristOrdersHeader">
          <h2 className="h2 txt-color-primary">Pesanan</h2>
        </div>

        <div className="FloristTableResponsive">
          <table className="FloristMainTable">
            <thead>
              <tr>
                <th className="p2 weight-semibold">Kode Pesanan</th>
                <th className="p2 weight-semibold">Pembeli</th>
                <th className="p2 weight-semibold">Produk</th>
                <th className="p2 weight-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="p2">{order.id}</td>
                  <td>
                    <div className="FloristBuyerCell">
                      <div className="FloristBuyerAvatar"></div>
                      <div className="FloristBuyerInfo">
                        <p className="FloristBuyerName p2 weight-semibold">{order.buyer}</p>
                        <p className="FloristBuyerSub p3">{order.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p2">{order.product}</td>
                  <td>
                    <span className={`FloristStatusPill FloristStatus${order.type}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FloristDashboard;