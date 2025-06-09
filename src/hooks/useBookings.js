
import { useState, useEffect } from 'react';

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
    setLoading(false);
  }, []);

  const createBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    return newBooking;
  };

  const updateBookingStatus = (id, status) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === id ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const getBookingsByUser = (userId) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  const getBookingsByVendor = (vendorId) => {
    return bookings.filter(booking => booking.vendorId === vendorId);
  };

  return {
    bookings,
    loading,
    createBooking,
    updateBookingStatus,
    getBookingsByUser,
    getBookingsByVendor
  };
}
