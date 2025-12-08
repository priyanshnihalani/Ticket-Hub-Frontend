import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Clock,
  Users,
  DollarSign,
  X
} from "lucide-react";

import { fetchEvents, createEvent, updateEvent, deleteEvent } from "../../Services/API/EventAPI.js";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    capacity: 100,
    price: 0
  });


  const loadEvents = async () => {
    const res = await fetchEvents({ isAdminEvent: true });
    setEvents(res.data.data.events);
  };

  useEffect(() => {
    loadEvents()
  }, [])

  const openAddModal = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      capacity: 100,
      price: 0
    });
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (editingEvent) {
      await updateEvent(editingEvent.id, formData);
    } else {
      await createEvent(formData);
    }

    setShowModal(false);
    loadEvents();
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    loadEvents();
  };

  const toggleStatus = async (event) => {
    try {
      const updatedStatus = !event.active;

      await updateEvent(event.id, {
        active: updatedStatus
      });

      loadEvents();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Manage Events</h1>
          <p className="text-gray-500">Create and manage your events</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full shadow hover:bg-orange-600"
        >
          <Plus size={18} /> Add New Event
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => {
          const progress = ((parseInt(event.bookingCount) / event.capacity) * 100).toFixed(2);
          return (
            <div
              key={event.id}
              className="border border-gray-200 rounded-3xl p-6 bg-white shadow-sm"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{event.title}</h2>
                  <span className="inline-block bg-red-100 text-red-500 text-xs px-3 py-1 rounded-full mt-1">
                    {event.active ? "active" : "inactive"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Pencil
                    className="cursor-pointer text-gray-500 hover:text-orange-500"
                    onClick={() => openEditModal(event)}
                  />
                  <Trash2
                    className="cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => handleDelete(event.id)}
                  />
                </div>
              </div>

              <p className="text-gray-600 mt-3">{event.description}</p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <InfoPill icon={<Calendar />} text={event.date.split("T")[0]} bgColor={'bg-blue-100'} textColor={'text-blue-400'} />
                <InfoPill icon={<Clock />} text={event.time} bgColor={'bg-purple-100'} textColor={'text-purple-400'} />
                <InfoPill
                  icon={<Users />}
                  text={`${parseInt(event.bookingCount)} / ${event.capacity}`}
                  bgColor={'bg-yellow-100'} textColor={'text-yellow-400'}
                />
                <InfoPill icon={<DollarSign />} text={`$${event.price}/-`} bgColor={'bg-green-100'} textColor={'text-green-400'} />
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Booking Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Toggle */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-t-gray-300">
                <span>Active Status</span>
                <button
                  className={`w-12 h-6 rounded-full p-1 transition ${{
                    true: "bg-orange-500",
                    false: "bg-gray-300"
                  }[event.active]}`}
                  onClick={() => toggleStatus(event)}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition transform ${event.active ? "translate-x-6" : "translate-x-0"
                      }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-xl relative">
            <button
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-1">
              {editingEvent ? "Edit Event" : "Add New Event"}
            </h2>
            <p className="text-gray-500 mb-4">
              {editingEvent
                ? "Edit event for ticket booking"
                : "Create a new event for ticket booking"}
            </p>

            <div className="space-y-3">
              <Input
                label="Event Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <Input
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
                <Input
                  label="Time"
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                />
                <Input
                  label="Price ($)"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="cursor-pointer px-6 py-2 rounded-full border border-gray-200 bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="cursor-pointer px-6 py-2 rounded-full bg-orange-500 text-white"
                >
                  {editingEvent ? "Save" : "Create Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const InfoPill = ({ icon, text, bgColor, textColor }) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${bgColor}`}>
    <span className={`${textColor}`}>{icon}</span>
    <span className="text-sm text-gray-700">{text}</span>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2 rounded-full border border-gray-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-300"
    />
  </div>
);

export default AdminEvents