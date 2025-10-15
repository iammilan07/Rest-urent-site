import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './bookTable.css';

const tablesData = [
  { id: 1, name: 'Table 1' },
  { id: 2, name: 'Table 2' },
  { id: 3, name: 'Table 3' },
  { id: 4, name: 'Table 4' },
  { id: 5, name: 'Table 5' },
];

const BookTable = () => {
  const [bookedTable, setBookedTable] = useState(null); // user's booked table
  const [globalBooked, setGlobalBooked] = useState([]); // all booked tables
  const [selectedTable, setSelectedTable] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [permanentMessage, setPermanentMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch user's booked table
        const userRes = await axios.get('/api/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (userRes.data.length > 0) {
          const tableId = userRes.data[0].tableNumber;
          setBookedTable(tableId);
          const table = tablesData.find(t => t.id === tableId);
          if (table) setPermanentMessage(`You have booked ${table.name}`);
        }

        // Fetch all booked tables
        const allRes = await axios.get('/api/bookings/all');
        setGlobalBooked(allRes.data.map(b => b.tableNumber));

      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  const handleBookClick = (table) => {
    if (globalBooked.includes(table.id) && bookedTable !== table.id) {
      // Already booked by someone else
      setToastMessage('Table is already booked! Please choose another table.');
      setTimeout(() => setToastMessage(''), 3000);
      return;
    }

    setSelectedTable(table);
    setShowConfirm(true);
  };

  const confirmBooking = async () => {
    try {
      const token = localStorage.getItem('token');

      if (bookedTable === selectedTable.id) {
        // Cancel booking
        await axios.delete(`/api/bookings/${selectedTable.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookedTable(null);
        setPermanentMessage('');
        setToastMessage(`You have removed ${selectedTable.name}`);

      } else {
        // Book table
        await axios.post('/api/bookings', { tableNumber: selectedTable.id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookedTable(selectedTable.id);
        setPermanentMessage(`You have booked ${selectedTable.name}`);
      }

      setShowConfirm(false);
      // refresh global bookings
      const allRes = await axios.get('/api/bookings/all');
      setGlobalBooked(allRes.data.map(b => b.tableNumber));

    } catch (err) {
      console.error(err);
      setToastMessage('Error booking table');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  return (
    <div className="booktable-container">
      <h2 className="greeting">Book your desired table {localStorage.getItem('username')}</h2>

      {permanentMessage && <div className="permanent-message">{permanentMessage}</div>}
      {toastMessage && <div className="toast-message">{toastMessage}</div>}

      <div className="tables-grid">
        {tablesData.map((table) => {
          const isGloballyBooked = globalBooked.includes(table.id);
          const isUserBooked = bookedTable === table.id;

          return (
            <div
              key={table.id}
              className={`table-card ${isUserBooked ? 'booked' : ''} ${isGloballyBooked && !isUserBooked ? 'globally-booked' : ''}`}
              onClick={() => handleBookClick(table)}
            >
              {table.name}
              <button className="book-btn">
                {isUserBooked ? 'Cancel' : isGloballyBooked ? 'Booked' : 'Book Now'}
              </button>
            </div>
          );
        })}
      </div>

      {showConfirm && (
        <div className="confirm-modal">
          <div className="confirm-card">
            <h3>
              {bookedTable === selectedTable?.id
                ? `Are you sure you want to cancel ${selectedTable.name}?`
                : `Are you sure you want to book ${selectedTable.name}?`}
            </h3>
            <div className="confirm-buttons">
              <button onClick={confirmBooking} className="yes-btn">Yes</button>
              <button onClick={() => setShowConfirm(false)} className="no-btn">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookTable;
