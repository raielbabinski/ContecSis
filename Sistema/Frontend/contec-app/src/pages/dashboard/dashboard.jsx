import React, { useState } from "react";
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from "@nivo/bar";
import { mockPieData as data, mockBarData as dataBar } from "../../data/mockData";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import Cadastro from "../register/register";

function MyPie() {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.6}
      cornerRadius={2}
      activeOuterRadiusOffset={8}
       colors={[ 'rgb(117, 87, 10)', '#DAA520', 'rgb(236, 193, 84)']}
      arcLinkLabelsTextColor="#fff"
      arcLinkLabelsColor="#fff"
      enableArcLabels={false}
      arcLabelsTextColor="#fff"
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateY: 56,
          itemWidth: 175,
          itemHeight: 18,
          itemSpacing: 30,
          symbolShape: 'circle',
        }
      ]}
      theme={{
        legends: {
          text: {
            fill: "#fff"
          }
        }
      }}
    />
  );
}

function MyBar() {
  return (
     <Box m="20px" height="400px" width="100%"> {/* Ajuste a altura e largura conforme necessário */}
      <ResponsiveBar
        data={dataBar}
        keys={['Seccionados', 'Enrolar', 'Manutenções']} 
        indexBy="Serviços"
        enableLabel={false}
        colors={[ 'rgb(117, 87, 10)', '#DAA520', 'rgb(236, 193, 84)']}
        labelSkipWidth={12}
        labelSkipHeight={12}
        theme={{ 
          axis: {
            domain: {
              line: {
                stroke: "#fff"
              }
            },
            legend: {
              text: {
                fill: "#fff"
              }
            },
            ticks: {
              line: {
                stroke: "#fff",
                strokeWidth: 1
              },
              text: {
                fill: "#fff"
              }
            }
          },
          legends: {
            text: {
              fill: "#fff"
            }
          }
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 120,
            itemsSpacing: 3,
            itemWidth: 100,
            itemHeight: 16,
            symbolSize: 18, // Tamanho do símbolo para a legenda
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Mês', // Legenda do eixo X
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Número de Vendas/Serviços', // Legenda do eixo Y
          legendPosition: 'middle',
          legendOffset: -40
        }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      />
    </Box>
  )
}

function Dashboard() {


  const [currentEvents] = useState([
    { id: '1', title: 'Portão Seccionado - Enio', start: new Date() },
    { id: '2', title: 'Portão de Enrolar - GianCarlo', start: new Date() }
  ]);

  return (
    <div style={{
      display: 'flex',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginLeft: '10px'
    }}>
      <div style={{ width: '600px', height: '300px', marginTop: "30px"}}> 
       
        <MyPie /> 
        <Box marginTop="410px" width="1300px"> <MyBar/> </Box>
        
      </div>

      <div style={{ width: '20%', height: '180px', position: "relative", marginLeft: "720px", marginTop: "10px"}}>
        
        <Box

          flex="0 0 250px"
          backgroundColor="#222222"
          p="10px"
          borderRadius="4px"
          minHeight="90vh"
          boxSizing="border-box"
        >
          <h1 style={{ color: "#fff" }}>Programação</h1>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{ backgroundColor: "#DAA520", margin: "10px 0", borderRadius: "2px" }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    formatDate(event.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      locale: "pt-br"
                    })
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </div>

 
    </div>
  )
}

export default Dashboard;
