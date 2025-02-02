// handlers/createBooking.js
"use server";

import { Client, Environment } from 'square';

const squareClient = new Client({
  bearerAuthCredentials: {
    accessToken: process.env.ACCESS_TOKEN,
  },
  environment: Environment.Sandbox,
});

// Utility function to sanitize the Square API response
const sanitizeResponse = (response) => {
  return {
    id: response.booking?.id,
    startAt: response.booking?.startAt,
    locationId: response.booking?.locationId,
    status: response.booking?.status,
    customerId: response.booking?.customerId,
  };
};

//Note to self. To properly book an appointment, you need provide Booking.location_id, Booking.start_at,
//Booking.AppointmentSegment.service_id, Booking.AppointmentSegment.team_member_id and Booking.AppointmentSegment.service_variation_id
//Booking.AppointmentSegment.service_variation_version and also customerID

// Create a booking using the Square API
//
export const createBooking = async (bookingData) => {
  try {
    const { startAt, locationId, customerId } = bookingData;

    const response = await squareClient.bookingsApi.createBooking({
      idempotencyKey: crypto.randomUUID(),
      booking: {
        startAt,
        locationId,
        customerId,

        appointmentSegments: [
          {
            teamMemberId: "TMGq_P1NxTHPyQ3J",
            serviceVariationId: "7WGNX3PET3F6GIZYDZRFOCUX",
            serviceVariationVersion: '1736791154230'
          }
        ]
      },
    });

    // Sanitize the response before returning it
    const sanitizedResponse = sanitizeResponse(response.result);

    return {
      success: true,
      booking: sanitizedResponse,
    };
  } catch (error) {
    console.error('Square API Error:', error.errors);

    // Return a serializable error object
    return {
      success: false,
      error: error.errors ? error.errors.map((err) => err.detail) : 'Failed to create booking',
    };
  }
};