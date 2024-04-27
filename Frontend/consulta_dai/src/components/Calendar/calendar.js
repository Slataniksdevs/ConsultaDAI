import React, { useState } from "react";
import {
  Box,
  Text,
} from "@chakra-ui/react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importar el idioma español de moment
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReservaModal from "../ReservaModal/reservaModal";

// Importar la imagen de fondo
import backgroundImage from "../../static/Imagenes/Portada_Arbeit_1.png";

// Configurar moment para usar el idioma español
moment.locale("es");
const localizer = momentLocalizer(moment);

function Calendar({ userData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [myEventsList, setMyEventsList] = useState([]);

  const handleAddEvent = (formData, selectedDate) => {
    const newEvent = {
      title: formData.userName,
      start: selectedDate,
      end: selectedDate,
    };

    setMyEventsList([...myEventsList, newEvent]);
    setModalOpen(false);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#71DBD4",
      borderRadius: "8px",
      border: "none",
      color: "#333",
      display: "block",
      fontSize: "14px",
      fontFamily: "Gotham, sans-serif",
      padding: "8px",
      margin: "2px",
    };
    return { style };
  };

  const EventComponent = ({ event }) => {
    return (
      <div>
        <strong>{event.title}</strong>
      </div>
    );
  };

  // Estilo para el calendario con la imagen de fondo
  const calendarStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    padding: "20px", // Añadir un poco de espacio alrededor del calendario
  };

  return (
    <Box flex="1" p="4">
      <Text fontSize="xl" mb="4">
        Reserva de Horas
      </Text>
      <div style={calendarStyle}> {/* Aplicar el estilo con la imagen de fondo */}
        <BigCalendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={(slotInfo) => {
            setSelectedDate(slotInfo.start);
            setModalOpen(true);
          }}
          min={new Date().setHours(7, 0, 0)}
          max={new Date().setHours(19, 0, 0)}
          components={{
            event: EventComponent,
          }}
          eventPropGetter={eventStyleGetter}
          step={60}
          timeslots={1}
          // Configurar los nombres de los días y meses en español
          formats={{
            dayFormat: 'ddd D',
            dateFormat: 'DD',
            monthHeaderFormat: 'MMMM',
            dayHeaderFormat: 'dddd',
            agendaDateFormat: 'ddd MMM DD',
            agendaTimeFormat: 'h:mm A',
            agendaTimeRangeFormat: 'h:mm A',
            eventTimeRangeFormat: 'h:mm A',
          }}
          messages={{
            allDay: 'Todo el día',
            previous: 'Anterior',
            next: 'Siguiente',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            agenda: 'Agenda',
            date: 'Fecha',
            time: 'Hora',
            event: 'Evento',
          }}
        />
      </div>
      <ReservaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddEvent={handleAddEvent}
        selectedDate={selectedDate}
        userData={userData}
      />
    </Box>
  );
}

export default Calendar;
