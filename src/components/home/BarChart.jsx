import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            },
            datalabels: {
              color: "#B3BAC5",
              font: {
                family: "Montserrat",
                size: 20,
              },
              anchor: "end",
              align: "end",
              offset: -2,
              formatter: function(value) {
                return value + "%";
              }
            }
          },
          maintainAspectRatio: false,
          responsive: true,

          layout: {
            padding: {
              top: 20,
            },
            
          },      
          scales:{
            y: {
              display: false,
              beginAtZero: true,
              grid: {
                display: false,
                drawBorder: false
              },
              min: 0,
              offset: true,
            },
            x: {
              display: true,

              beginAtZero: true,
              //set max value to 100
              grid: {
                display: false,
                drawBorder: false
              },
              border: {
                color: "rgba(0,0,0,0)",
              },
              
              ticks: {
                font: {
                  family: "Montserrat",
                  size: 16,
                  //bold
                  weight: "bold",
                },
                color: "#B3BAC5",
                
              },
            }
          }
          
        }}
      />
    </div>
  );
};