import { useContext, useState } from "react";
import { FiSend } from "react-icons/fi";
import { AdminContext } from "../context/AdminContext";

const Send = () => {
  const { sendNotification } = useContext(AdminContext);

  const [recipient_username, setRecipientUsername] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const notificationTypes = [
    { id: "general", label: "General" },
    { id: "urgent", label: "Urgent" },
    { id: "reminder", label: "Reminder" },
    { id: "alert", label: "Alert" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    sendNotification(recipient_username, title, message, type);

    // reset the fields 
    setRecipientUsername("");
    setTitle("");
    setMessage("");
    setType("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Notification</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={recipient_username}
              onChange={(e) => setRecipientUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recipient's username"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Notification Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter notification title"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Notification Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your notification message here"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Notification Type
            </label>
            <select
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a type</option>
              {notificationTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            <FiSend className="mr-2" />
            Send Notification
          </button>
        </form>
      </div>
    </div>
  );
};

export default Send;
