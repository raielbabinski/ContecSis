import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { useState } from 'react';
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "../../styles/instalacoes.css"

function Programacao() {
  const [currentEvents, setCurrentsEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Coloque uma data ai");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay
      });
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Tem certeza que quer deletar o evento '${selected.event.title}'?`)) {
      selected.event.remove();
    }
  };


  return (
    <Box className="calendar-container" m="20px" width="100%" overflow="hidden">
      <Box
        className="calendar-content-container"
        display="flex"
        justifyContent="space-between"
        width="100%"
        overflow="hidden"
      >
        {/* BARRA LATERAL DO CALENDÁRIO */}
        <Box
          flex="0 0 250px"  // largura fixa da sidebar
          backgroundColor="#222222"
          p="10px"
          borderRadius="4px"
          minHeight="80vh"
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
                    <h2>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        locale: "pt-br"
                      }
                      )}
                    </h2>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDÁRIO */}
        <Box flex="1 1 auto" minHeight="80vh" ml="10px" overflow="hidden" color="#fff">
          <FullCalendar
            locale={ptBrLocale}
            height="80vh"  // reduzido para evitar excesso
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEventRows={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentsEvents(events)}
            initialEvents={[
              { id: "1234", title: "Portão Seccionado - Enio", date: "2025-09-12" },
              { id: "1523", title: "Portão de Enrolar - GianCarlo ", date: "2025-09-14" },
              { id: "152354", title: "Manutenção - Neimar", date: "2025-09-16" },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Programacao;
