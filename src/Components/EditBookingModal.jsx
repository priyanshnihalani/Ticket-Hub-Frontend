import { useState, useEffect } from "react";
import { X } from "lucide-react";

const allSeats = [
    { number: "A1" }, { number: "A2" }, { number: "A3" }, { number: "A4" }, { number: "A5" }, { number: "A6" },
    { number: "B1" }, { number: "B2" }, { number: "B3" }, { number: "B4" }, { number: "B5" }, { number: "B6" },
    { number: "C1" }, { number: "C2" }, { number: "C3" }, { number: "C4" }, { number: "C5" }, { number: "C6" }
];

const EditBookingModal = ({
    isEditOpen,
    selectedBooking,
    closeModal,
    handleChange,
    handleSave
}) => {

    if (!isEditOpen || !selectedBooking) return null;
    
    const initialSeats = selectedBooking.tickets
    ? selectedBooking.tickets.split(",").map(s => s.trim()) 
    : [];
    
    const [selectedSeats, setSelectedSeats] = useState(initialSeats);

    useEffect(() => {
        setSelectedSeats(
            selectedBooking.tickets
                ? selectedBooking.tickets.split(",").map(s => s.trim()) 
                : []
        );
    }, [selectedBooking]);


    useEffect(() => {
        setSelectedSeats(initialSeats);
    }, [selectedBooking]);

    // all booked seats for this event (except this booking)
    const bookedSeatsInEvent = selectedBooking.allSeats
        ? selectedBooking.allSeats.flat()
        : [];

    const disabledSeats = bookedSeatsInEvent.filter(
        seat => !initialSeats.includes(seat)
    );

    const toggleSeat = (seat) => {
        if (disabledSeats.includes(seat)) return;

        setSelectedSeats(prev =>
            prev.includes(seat)
                ? prev.filter(s => s !== seat)
                : [...prev, seat]
        );
    };

    const saveBooking = () => {
        handleSave({
            ...selectedBooking,
            seats: selectedSeats,
            tickets: selectedSeats.join(",")
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-xl">

                <button
                    onClick={closeModal}
                    className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={22} />
                </button>

                <h2 className="text-xl font-semibold text-gray-800">Edit Booking</h2>
                <p className="text-sm text-gray-500 mb-5">Update the booking details below</p>

                <div className="space-y-4">

                    {/* Event Title */}
                    <div>
                        <label className="text-sm font-medium">Event Title</label>
                        <input
                            name="event"
                            value={selectedBooking.event || ""}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Date</label>
                            <input
                                name="date"
                                value={selectedBooking.date || ""}
                                onChange={handleChange}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Time</label>
                            <input
                                name="time"
                                value={selectedBooking.time || ""}
                                onChange={handleChange}
                                className="input-field"
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Price (₹)</label>
                            <input
                                name="price"
                                value={selectedBooking.price || ""}
                                onChange={handleChange}
                                className="input-field"
                            />
                        </div>
                    </div>

                    {/* Seat selection */}
                    <div>
                        <label className="text-sm font-medium">Select Seats</label>

                        <div className="mt-3 space-y-4 bg-orange-50 p-3 rounded-lg">
                            {["A", "B", "C"].map(row => (
                                <div key={row} className="flex items-center justify-center gap-3">

                                    <span className="w-6 text-gray-700 font-semibold">{row}</span>

                                    <div className="grid grid-cols-6 gap-3">
                                        {allSeats
                                            .filter(s => s.number.startsWith(row))
                                            .map(seat => {

                                                const isDisabled = disabledSeats.includes(seat.number);
                                                const isSelected = selectedSeats.includes(seat.number);

                                                return (
                                                    <button
                                                        key={seat.number}
                                                        onClick={() => toggleSeat(seat.number)}
                                                        disabled={isDisabled}
                                                        className={`
                              w-10 h-10 rounded-lg border flex items-center justify-center transition
                              ${isDisabled
                                                                ? "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
                                                                : isSelected
                                                                    ? "bg-orange-500 text-white border-orange-700 scale-105"
                                                                    : "bg-white border-gray-300 hover:bg-gray-100"}
                            `}
                                                    >
                                                        {seat.number}
                                                    </button>
                                                );
                                            })}
                                    </div>

                                    <span className="w-6 text-gray-700 font-semibold">{row}</span>

                                </div>
                            ))}
                        </div>

                        <div className="mt-3 text-sm text-gray-700">
                            Selected: {selectedSeats.length ? selectedSeats.join(", ") : "None"}
                        </div>
                    </div>

                </div>

                <div className="flex justify-end gap-3 mt-7">
                    <button
                        onClick={closeModal}
                        className="cursor-pointer px-5 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={saveBooking}
                        className="cursor-pointer px-6 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-sm transition"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EditBookingModal;
