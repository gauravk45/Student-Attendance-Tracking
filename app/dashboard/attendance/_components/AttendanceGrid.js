import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from "moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { getUniqueRecord } from "@/app/_services/services";

const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [25, 50, 100];
function AttendanceGrid({ attadanceList, selectedMonth }) {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "studentId", headerName: "Student ID",filter:true },
    { field: "name", headerName: "Name",filter:true },
  ]);

  // Get the number of days in the selected month
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const numberOfDays = daysInMonth(
    moment(selectedMonth).year(),
    moment(selectedMonth).month()
  );

  const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  useEffect(() => {
    // Set up columns for each day of the month only once
    const dynamicCols = daysArray.map((day) => ({
      field: day.toString(),
      headerName: day.toString(),
      width: 50,
      editable: true,
    }));

    setColDefs((prev) => [...prev.slice(0, 2), ...dynamicCols]);

    if (attadanceList && attadanceList.length > 0) {
      const userList = getUniqueRecord();
      userList.forEach((student) => {
        daysArray.forEach((day) => {
          student[day] = isPresent(student.studentId, day);
        });
      });
      setRowData(userList);
    }
  }, [attadanceList, selectedMonth]);

  const isPresent = (studentId, day) => {
    const result = attadanceList.find(
      (item) => item.day == day && item.studentId == studentId
    );
    return result ? true : false;
  };

  const onMarkAttendance = (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format("MM/YYYY");
    console.log(
      "Day:",
      day,
      "Student ID:",
      studentId,
      "Present:",
      presentStatus
    );

    if (presentStatus) {
      const data = {
        day: day,
        studentId: studentId,
        present: presentStatus,
        date: date,
      };
      GlobalApi.MarkAttendance(data).then((resp) => {
        console.log("Response:", resp);
        toast("Student ID:" + studentId + " marked as present");
      });
    } else {
      GlobalApi.MarkAbsent(studentId, date, day).then((resp) => {
        console.log("Response:", resp);
        toast("Student ID:" + studentId + " marked as absent");
      });
    }
  };

  return (
    <div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e) =>
            onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue) }
            pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default AttendanceGrid;
