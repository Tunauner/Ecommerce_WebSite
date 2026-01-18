import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AnalyticComponent = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("/analytics");
        setAnalyticsData(res.data.analyticsData);
        setDailySalesData(res.data.dailySalesData);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong in fetching analytics data",
        );
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 bg-white border border-gray-200 rounded-xl">
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-8">
        Analytics
      </h2>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="mt-2 text-3xl font-medium text-gray-900">
            {analyticsData.users}
          </p>
        </div>

        <div className="border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="mt-2 text-3xl font-medium text-gray-900">
            {analyticsData.products}
          </p>
        </div>

        <div className="border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="mt-2 text-3xl font-medium text-gray-900">
            {analyticsData.totalSales}
          </p>
        </div>

        <div className="border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="mt-2 text-3xl font-medium text-gray-900">
            ${analyticsData.totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* CHART */}
      <div className="border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Sales & Revenue (Last 7 Days)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailySalesData}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="2 2" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#6b7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                color: "#111827",
              }}
              labelStyle={{ color: "#111827" }}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#111827"
              strokeWidth={2}
              dot={false}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#6b7280"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticComponent;
