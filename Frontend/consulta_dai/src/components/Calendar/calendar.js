import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
} from "@chakra-ui/react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReservaModal from "../ReservaModal/reservaModal";
import backgroundImage from "../../static/Imagenes/Portada_Arbeit_1.png";
import SideBar from "../SideBar/Sidebar";

moment.locale("es");
const localizer = momentLocalizer(moment);

function Calendar({ userData, isSidebarOpen }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [myEventsList, setMyEventsList] = useState([]);
  const [newEvent, setNewEvent] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': token
      }
    };
  
    axios.get("http://127.0.0.1:5000/booking/list_all_bookings", config)
      .then((response) => {
        const events = response.data.map((reservation) => ({
          title: reservation.user_name,
          start: new Date(reservation.fecha_reserva + "T" + reservation.hora_inicio),
          end: new Date(reservation.fecha_reserva + "T" + reservation.hora_termino),
        }));
        setMyEventsList(events);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleAddEvent = (formData, selectedDate) => {
    const newEvent = {
      title: formData.userName,
      start: selectedDate,
      end: moment(selectedDate).add(1, 'hour').toDate(),
    };
    setNewEvent(newEvent)
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

  const calendarStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    padding: "20px",
  };

  return (
    <Box flex="1" p="4" ml={isSidebarOpen ? "250px" : "0"}>
      <Text fontSize="xl" mb="4" pl="4" >
        Reserva de Horas
      </Text>
      <div style={calendarStyle}>
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
        date={newEvent}
      />
    </Box>
  );
}

export default Calendar;
