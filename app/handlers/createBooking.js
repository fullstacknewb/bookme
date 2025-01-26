// handlers/createBooking.js
"use server";

import { Client, Environment } from 'square';

const squareClient = new Client({
  bearerAuthCredentials: {
    accessToken: 'EAAAl1ObzCX7S9AkD193gc2B_UymC23Wg1t7Q6zp0x9OgUVWGa7W_hAc3lIwci_n',
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
  };
};

export const createBooking = async (bookingData) => {
  try {
    const { startAt, locationId } = bookingData;

    const response = await squareClient.bookingsApi.createBooking({
      idempotencyKey: crypto.randomUUID(),
      booking: {
        startAt,
        locationId,
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