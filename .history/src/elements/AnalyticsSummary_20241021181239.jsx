import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const prisma = new PrismaClient();

const chartConfig = {
  visitors: {
    label: "Quantity", 
  },
  safari: {
    label: "Products",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const fetchProductData = async () => {
  const products = await prisma.product.findMany();
  const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
  return totalQuantity;
};

const RadialChart = ({ totalQuantity }) => {
  const chartData = [
    { browser: "products", visitors: totalQuantity, fill: "var(--color-safari)" },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Product Quantity</CardTitle>
        <CardDescription>Current Total Quantity</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Quantity
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total quantity of products
        </div>
      </CardFooter>
    </Card>
  );
};

const AnalyticsPage = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const quantity = await fetchProductData();
      setTotalQuantity(quantity);
    };
    getData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <RadialChart totalQuantity={totalQuantity} />
    </div>
  );
};

export default AnalyticsPage;