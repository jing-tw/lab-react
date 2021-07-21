import React, { useEffect } from 'react';
import Dygraph from 'dygraphs';
import './showWave.css';

function ShowWave(props: { labName: number }): JSX.Element {
    console.log('ShowWave:' + JSON.stringify(props));
    let data: any = [];

    useEffect(() => {
        console.log('use Effect');

        var t = new Date();
        var g = new Dygraph('graph', data, {
            drawPoints: true,
            showRoller: true,
            valueRange: [0.0, 1.2],
            labels: ['Time', 'Random']
        });

        setInterval(() => {
            var x = new Date(); // current time
            var y = Math.random();
            console.log('id = ' + props.labName + ' x = ' + x + ' y = ' + y);
            if (data.length > 100)
                data.shift();
            data.push([x, y]);
            g.updateOptions({
                'file': data
            });
        }, 100);
    }, []);


    return (
        <div>
            <div>{props.labName}</div>
            <div id="graph"  className="center"> </div>
        </div>
    );

}
export default ShowWave;



