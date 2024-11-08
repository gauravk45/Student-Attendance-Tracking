import { getUniqueRecord } from "@/app/_services/services";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartComponents({ attadanceList, totalPresentData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    formatAttendanceListCount();
  }, [attadanceList || totalPresentData]);

  const formatAttendanceListCount = () => {
    const totalStudent = getUniqueRecord(attadanceList);
    const result = totalPresentData.map((item) => ({
      day: item.day,
      presentCount: item.presentCount,
      absentCount: Number(totalStudent?.length) - Number(item.presentCount),
    }));
    setData(result);
    console.log("Result BARCHART", result);
  };

  return (
    <div>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="presentCount" fill="#8884d8" />
        <Bar dataKey="absentCount" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default BarChartComponents;
