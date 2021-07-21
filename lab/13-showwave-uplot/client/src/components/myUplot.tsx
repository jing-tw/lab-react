import React, { useMemo, useState } from "react";
import ReactDOM, { unstable_batchedUpdates } from "react-dom";

import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

import UPlotReact from "uplot-react";
import './myUplot.css';

// const root: HTMLElement = document.querySelector("#root") as HTMLElement;

const mytest: HTMLElement = document.querySelector("#mytest") as HTMLElement;


const dummyPlugin = (): uPlot.Plugin => ({
    hooks: {
        init(u: uPlot, opts: uPlot.Options) {
            void u;
            void opts;
        }
    }
});

const HooksApp = () => {
    const [options, setOptions] = useState<uPlot.Options>(
        useMemo(
            () => ({
                title: "My Chart",
                width: 400,
                height: 300,
                series: [
                    {
                        label: "Date"
                    },
                    {
                        label: "",
                        points: { show: false },
                        stroke: "blue",
                        fill: "blue"
                    }
                ],
                plugins: [dummyPlugin()],
                scales: { x: { time: false } }
            }),
            []
        )
    );

    const initialState = useMemo<uPlot.AlignedData>(
        () => [
            [...new Array(100000)].map((_, i) => i),
            [...new Array(100000)].map((_, i) => i % 1000)
        ],
        []
    );
    const [data, setData] = useState<uPlot.AlignedData>(initialState);

    setTimeout(() => {
        console.log('data[0].length = ' + data[0].length);
        const newOptions = {
            ...options,
            title: "Rendered with hooks " + data[0].length
        };
        const newData: uPlot.AlignedData = [
            [...data[0], data[0].length],
            [...data[1], data[0].length % 1000]
        ];

        unstable_batchedUpdates(() => {
            setData(newData);
            setOptions(newOptions);
        });
    }, 1000);
    return (
        <div id="mytest" className="center">
            test1234
            <UPlotReact
                key="hooks-key"
                options={options}
                data={data}
                target={mytest}
                onDelete={(/* chart: uPlot */) => console.log("Deleted from hooks")}
                onCreate={(/* chart: uPlot */) => console.log("Created from hooks")}
            />
        </div>
    );
};

export default HooksApp;