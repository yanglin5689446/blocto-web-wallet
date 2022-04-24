import { PieChart, Pie, Cell } from "recharts";

const renderCustomizedLabel = ({ name, value }: any) => {
  return `${name}: $${value.toFixed(2)}`;
};

const Statistics = ({ assetGroups }: { assetGroups: any }) => {
  const data = Object.entries(assetGroups).map(([name, value]) => ({
    ...(value as object),
    name,
  }));
  return (
    <PieChart width={500} height={300} onMouseEnter={() => null}>
      <Pie
        data={data}
        cx={250}
        cy={150}
        innerRadius={80}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label={renderCustomizedLabel}
      >
        {data.map((entry: any, index: any) => (
          <Cell key={`cell-${index}`} fill={`#${entry.color}`} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default Statistics;
