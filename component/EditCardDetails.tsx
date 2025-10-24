import { SquarePen } from "lucide-react";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase_config"; // adjust your import path

interface EditContactFormProps {
  cardData: any;
  userLogin?: boolean;
  userId: string; // firebase doc ID
  onUpdate?: (updatedData: any) => void; // Add callback prop
}

export default function EditContactForm({ 
  userLogin, 
  cardData, 
  userId,
  onUpdate 
}: EditContactFormProps) {
  const getInitials = (name: string = "User") =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 5);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(cardData?.cardInfo.name || "");
  const [headline, setHeadline] = useState(cardData?.cardInfo.headline || "");
  const [location, setLocation] = useState(cardData?.cardInfo.location || "");

  // Local display state that updates immediately
  const [displayData, setDisplayData] = useState({
    name: cardData?.cardInfo.name || "",
    headline: cardData?.cardInfo.headline || "",
    location: cardData?.cardInfo.location || ""
  });

  const saveChanges = async () => {
    if (!name || !headline || !location) {
      alert("All fields are required!");
      return;
    }
    try {
      const updatedCardInfo = {
        name,
        headline,
        location,
      };

      const docRef = doc(db, "cards", cardData.id); // adjust your collection name
      await updateDoc(docRef, {
        cardInfo: updatedCardInfo,
      });

      // Update local display state immediately
      setDisplayData(updatedCardInfo);

      // Call parent callback if provided
      if (onUpdate) {
        onUpdate({
          ...cardData,
          cardInfo: updatedCardInfo
        });
      }

      alert("Profile updated successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="relative">
      {/* Profile Card */}
      <div className="w-full h-56 border shadow-xl border-amber-50 rounded-2xl my-20 mb-10 bg-white relative">
        <div className="flex justify-center">
          <div className="w-36 h-36 bg-gray-400 rounded-full border-4 border-white -mt-16 flex justify-center items-center relative">
            <h1 className="text-white text-3xl">{getInitials(displayData.name)}</h1>

            {/* Edit Icon */}
            {userLogin && (
              <button
                onClick={() => setShowForm(true)}
                className="absolute bottom-0 right-0 bg-black p-2 rounded-full shadow-lg"
              >
                <SquarePen color="#fff" size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-2">
          <h1 className="text-black text-2xl font-bold mt-4">{displayData.name}</h1>
          <p className="text-black text-sm mt-1">{displayData.headline}</p>
          <p className="text-black text-sm mt-2">{displayData.location}</p>
        </div>
      </div>

      {/* Bottom Sheet Form */}
      {showForm && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-2xl p-6 transition-transform duration-300 z-50">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold text-black">Edit Profile</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-500 text-xl">✖</button>
          </div>

          <div className="mb-4">
            <label className="text-gray-700 text-lg font-bold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="w-full px-3 py-2 border rounded-xl mt-1 h-12 text-gray-700"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 text-lg font-bold">Designation / Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Enter designation"
              className="w-full px-3 py-2 border rounded-xl mt-1 h-12 text-gray-700"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 text-lg font-bold">Company / Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter company or location"
              className="w-full px-3 py-2 border rounded-xl mt-1 h-12 text-gray-700"
            />
          </div>

          <button
            onClick={saveChanges}
            className="w-full bg-blue-600 text-white py-3 text-xl rounded-lg mt-2"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}