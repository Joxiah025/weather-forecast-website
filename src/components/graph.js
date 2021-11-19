import React, { useContext, useEffect, useRef } from "react";
import { Line, Chart } from 'react-chartjs-2';
import DataContext from "../contexts/context";

const Graph = () => {
  const {data, } = useContext(DataContext);

  const graphRef = useRef();

  const tooltipPlugin = Chart.registry.getPlugin('tooltip');
  tooltipPlugin.positioners.above = (el) => {
      return {
          x: el[0].element.x - 30,
          y: el[0].element.y - 30
      };
  };
 
  const chartData = {
    labels: data?.weather?.daily.map((x,i) => 'Nov. '+i),
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        data: data?.weather?.daily.map(x => x.temp.max),
        fill: 
        {
          target: 'origin',
          above: data.darkMode ? '#047857' : '#eef4fe',   // Area will be red above the origin
          below: data.darkMode ? '#047857' : '#eef4fe'   // And blue below the origin
        }
      }
    ]
}


  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        usePointStyle: true,
        position: 'above',
        backgroundColor: 'transparent',
        displayColors: false,
        bodyFontSize: 22,
        bodyColor: data.darkMode ? '#6ee7b7' : '#5596f6',
        bodyFont: {
          weight: 'bold',
          size: 15,
          family: 'Open Sans, sans-serif',
        },
        callbacks: {
          title: () => '',
          label(context) {
            return context.raw + '°F';
          },
        },
      },
      title: {
        display: true,
        text: 'Max Temperature',
        color: data.darkMode ? '#6b7280' : '#4b5563',
        font: {
          weight: '700',
          size: '16'
        },
        align: 'start',
        padding: { bottom: 100, top: 5 }
      },
    },
    responsive: true,    
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          display: false
        },
        grid:{
          display: false,
          drawBorder: false
        }
      },
      y: {
        ticks: {
          display: false
        },
        grid:{
          display: false,
          drawBorder: false
        }
      }
    },
    elements: {
      line: {
        // padding: 10,
        // you can set indiviual colors for each bar
        backgroundColor: data.darkMode ? '#6ee7b7' : '#5596f6',
        borderWidth: 3,
        tension: 0.4,
        // stepped: true,
        borderColor: data.darkMode ? '#6ee7b7' : '#5596f6',
        borderDashOffset: 0.3,
        fill: true,
      },
      point: {
        backgroundColor: data.darkMode ? '#047857' : '#5596f6',
        hoverRadius: 10,
        pointRadius: 0,
        pointBorderColor: '#fff', 
        borderColor: '#fff',
        borderWidth: 0, 
        hoverBorderWidth: 4,
        borderDashOffset: 0.2,
        borderCapStyle: 'round',
      }
    },
    events: []
  };

  useEffect(() => {
    const updatePointerColor = () => {
      const point = graphRef.current.getActiveElements();
      point[0].element.options.borderColor = '#fff';
      point[0].element.options.backgroundColor = data.darkMode ? '#047857' : '#5596f6';
      graphRef.current.update();
    }

    const setActive = () => {
      graphRef.current.setActiveElements([
        {
          datasetIndex: 0,
          index: data.activeIndex,
        }
      ]);
  
      graphRef.current.tooltip.setActiveElements([
        { datasetIndex: 0, index: data.activeIndex }
      ]);
  
      graphRef.current.tooltip.update();
      graphRef.current.update();
      updatePointerColor();
    };

    if (data.weather != null && graphRef.current) {
      setActive();      
    }

  }, [data, graphRef])


  return (
    <>
      {/* <ReactApexChart options={graph.options} series={graph.series} type="area" height={250} /> */}
      <Line 
        type="area" 
        data={chartData}
        width={100}
        height={250}
        options={options}
        ref={graphRef}
      />
    </>
  );
}

export default Graph;
