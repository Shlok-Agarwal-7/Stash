"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculateAngle, calculatePercentage } from "@/lib/utils";

const chartConfig = {
  usage: {
    label: "Storage Used",
    color: "#2fabe4",
  },
  size :{
    label : "Empty",
    color : "#282828"
  }
} satisfies ChartConfig;

export default function ChartRadialStacked({ used = 0 }: { used: number }) {
  const totalSpace = 2 * 1024 * 1024 * 1024;
  const chartData = [
    { name: "used", value: used },
    { name: "total", value: totalSpace },
  ];
  const percent = calculatePercentage(used);
  const endAngle = calculateAngle(percent);

  return (
    <Card className="">
      <CardContent className="">
        <ChartContainer
          config={chartConfig}
          className=""
        >
          <RadialBarChart
            data={chartData}
            endAngle={0}
            startAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <RadialBar
              dataKey="value"
              fill="hsl(var(--muted))"
              cornerRadius={5}
              data={[{ value: totalSpace }]}
              className="stroke-transparent"
            />

            <RadialBar
              dataKey="value"
              fill="var(--color-usage)"
              cornerRadius={5}
              className="stroke-transparent"
              endAngle={endAngle}
              data={[{ value: used }]}
            />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {percent}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Space used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
