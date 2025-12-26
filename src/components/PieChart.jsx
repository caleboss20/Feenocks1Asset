import { motion } from "framer-motion";
export default function PieChartRecommendation() {
  const investments = [
    { name: "Real Estate Capital", value: 30, color: "#1B82F6" },
    { name: "Mutual Fund Capital", value: 20, color: "#60A5FA" },
    { name: "Bitsusu Capital", value: 10, color: "#93C5FD" },
    { name: "Investwise Capital", value: 15, color: "#BFDBFE" },
    { name: "Agribusiness Capital", value: 15, color: "#DBEAFE" },
    { name: "Forex Trading Capital", value: 10, color: "#EFF6FF" },
  ];
  // Build conic gradient string
  let start = 0;
  const gradientSlices = investments.map((inv) => {
    const end = start + inv.value;
    const slice = `${inv.color} ${start}% ${end}%`;
    start = end;
    return slice;
  });
  const gradientString = `conic-gradient(${gradientSlices.join(", ")})`;
  return (
    <div className="p-8 flex flex-col space-y-4 mb-20 mt-10">
      {/* Animated Pie Chart */}
     
      <div className="flex w-full justify-center">
         <motion.div
        className="w-64 h-64 rounded-full shadow-xl"
        style={{ background: gradientString }}
        initial={{ rotate: -90, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      ></motion.div>
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 gap-10 w-full text-lg mt-15">
        {investments.map((inv) => (
          <div key={inv.name} className="flex items-center gap-2">
            <div
              className=" px-3 py-3 rounded-full"
              style={{ backgroundColor: inv.color }}
            ></div>
            <span>{inv.name} ({inv.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}