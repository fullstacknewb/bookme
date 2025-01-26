"use client";
import { useEffect, useRef } from 'react';
import "flatpickr/dist/themes/material_green.css";
import flatpickr from "flatpickr";
import { createBooking } from '../handlers/createBooking';

export default function Calendar() {
  const calendarRef = useRef(null);
  const flatpickrInstance = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      flatpickrInstance.current = flatpickr(calendarRef.current, {
        defaultDate: new Date(),
        dateFormat: "Y-m-d H:i",
        altFormat: "F j, Y",
        enableTime: true,
        onChange: function (selectedDates, dateStr, instance) {
          console.log("Date changed:", selectedDates);
        },
      });
    }

    return () => {
      if (flatpickrInstance.current) {
        flatpickrInstance.current.destroy();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedDates = flatpickrInstance.current.selectedDates;

    if (selectedDates.length > 0) {
      const startAt = selectedDates[0].toISOString();

      try {
        const response = await createBooking({
          startAt: startAt,
          locationId: 'LY2QRHG0Q0XZ7',
        });

        if (response.success) {
          console.log('Booking created:', response.booking);
        } else {
          console.error('Booking creation failed:', response.error);
        }
      } catch (error) {
        console.error('Error creating booking:', error);
      }
    } else {
      console.log("No dates selected");
    }
  };

  return (
    <div id="calendar-container">
      <form onSubmit={handleSubmit}>
        <input id='' type='text' placeholder='Name'></input>
        <input id="calendar" type="text" ref={calendarRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}