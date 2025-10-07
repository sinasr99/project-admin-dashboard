import {FC, useContext, useState} from "react";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import CustomTooltipRechart from "./CustomTooltipRechart";
import {ThemeContext} from "../contextAPI/themeContext";

export type chartDataType = {
    key: string,
    value: number
}[]

interface ChartWrapperProps {
    data: chartDataType,
    title: string,
    tooltipKey: string,
    afterValue?: string
}

const ChartWrapper: FC<ChartWrapperProps> = ({tooltipKey, afterValue, title, data}) => {
    const [dataState, setDataState] = useState<chartDataType>(data)
    const {theme} = useContext(ThemeContext)

    return (
        <div
            className="sell-wrapper z-10 relative shadow-md rounded-md py-4 bg-white mb-8 dark:bg-zinc-700 max-w-[1000px] mx-auto">
            <h3 className="sell-title text-2xl font-bold text-center text-shadow-xs dark:text-white">
                {title}
            </h3>
            <div
                className="sell-chart-wrapper pr-2 sm:pr-0 max-w-[400px] h-[150px] sm:max-w-[700px] sm:w-[600px] sm:h-[250px] lg:w-[700px] lg:h-[300px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart className="mx-auto mt-7" data={dataState}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            interval={0}
                            scale="point"
                            dataKey="key"
                            tick={({x, y, payload}) => {
                                const day = payload.value.slice(0, 3);
                                const date = payload.value.slice(3);
                                const fillColor = theme === "Dark" ? 'rgba(255,255,255,0.8)' : '#666';
                                return (
                                    <text
                                        fill={fillColor}
                                        x={x}
                                        y={y + 15}
                                        textAnchor="middle"
                                    >
                                        <tspan className="text-xs sm:text-base dark:text-white"
                                               x={x} dy="0">{day}</tspan>
                                        <tspan
                                            className="text-xs sm:text-sm dark:text-white hidden md:block"
                                            x={x}
                                            dy="15">{date}</tspan>
                                    </text>
                                );
                            }}
                        />
                        <YAxis
                            dataKey="value"
                            tick={({x, y, payload}) => (
                                <text
                                    x={x - 4}
                                    y={y}
                                    textAnchor="end"
                                    className="dark:fill-white font-medium text-sm sm:text-base"
                                >
                                    {payload.value}
                                </text>
                            )}
                        />
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip content={<CustomTooltipRechart tooltipKey={tooltipKey} afterValue={afterValue || ""}/>}/>
                        <Area type="monotone" dataKey="value" stroke="#ff6900" fillOpacity={0.6}
                              fill="#ff6900"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default ChartWrapper