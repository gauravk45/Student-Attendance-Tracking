"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import MonthSelection from "../_components/MonthSelection";
import GradeSelect from "../_components/GradeSelect";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";
import BarChartComponents from "./_components/BarChartCOmponents";

function Dashboard() {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attadanceList, setAttendanceList] = useState();
  const [totalPresentData, setTotalPresentData] = useState([]);

  useEffect(() => {
    getStudentAttendance();
    GetTotalPresentCountByDay();
  }, [selectedMonth]);

  useEffect(() => {
    getStudentAttendance();
    GetTotalPresentCountByDay();
  }, [selectedGrade]);

  const getStudentAttendance = () => {
    GlobalApi.GetAttendanceList(
      selectedGrade,
      moment(selectedMonth).format("MM/YYYY")
    ).then((resp) => {
      // console.log("Resp", resp.data);
      setAttendanceList(resp.data);
    });
  };

  const GetTotalPresentCountByDay = () => {
    GlobalApi.TotalPresentCountByDay(
      moment(selectedMonth).format("MM/YYYY"),
      selectedGrade
    ).then((resp) => {
      console.log("Resp", resp.data);
      setTotalPresentData(resp.data);
    });
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>

        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelect selectedGrade={(v) => setSelectedGrade(v)} />
        </div>
      </div>

      <StatusList attadanceList={attadanceList} />

      <div className="grid grid-cols0=-1 md:grid-cols-3">
        <div className="md:cols-span-2">
          <BarChartComponents
            attadanceList={attadanceList}
            totalPresentData={totalPresentData}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
