import { getUniqueRecord } from "@/app/_services/services";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";

function StatusList({ attadanceList }) {
  const [totalStudent, setTotalStudent] = useState(0);
  const [presentPerc, setPersentPerc] = useState(0);

  useEffect(() => {
    if (attadanceList) {
      const totalSt = getUniqueRecord(attadanceList);
      setTotalStudent(totalSt.length);
      const today = moment().format("D");
      const PresentPrec =
        (attadanceList.length / (totalSt.length * Number(today))) * 100;
      setPersentPerc(PresentPrec);
    }
  }, [attadanceList]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card
        icon={<GraduationCap />}
        title="Total Student"
        value={totalStudent}
      />
      <Card
        icon={<TrendingUp />}
        title="Total % Present"
        value={presentPerc.toFixed(1)}
      />
      <Card
        icon={<TrendingDown />}
        title="Total % Absent"
        value={(100 - presentPerc).toFixed(1)}
      />
    </div>
  );
}

export default StatusList;
