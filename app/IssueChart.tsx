"use client";

import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={[
          { name: "Open", value: open },
          { name: "In Progress", value: inProgress },
          { name: "Closed", value: closed },
        ]}
      >
        <XAxis dataKey="value" />
        <YAxis />
        <Bar dataKey="value" barSize={60} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IssueChart;
