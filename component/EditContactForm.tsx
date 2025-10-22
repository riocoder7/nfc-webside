"use client";

import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase_config";

interface EditContactFormProps {
  cardData: any;
  userLogin?: boolean;
}

export default function EditContactForm({ userLogin, cardData }: EditContactFormProps) {
  const [showPersonalForm, setShowPersonalForm] = useState(false);

  const auth = getAuth();

  // Controlled form state
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (cardData?.contactInfo) {
      setPhone(cardData.contactInfo.phone || "");
      setEmail(cardData.contactInfo.email || "");
      setLinkedin(cardData.contactInfo.linkedin || "");
      setWebsite(cardData.contactInfo.website || "");
    }
  }, [cardData]);

  // Validation
  const isValidUrl = (url: string) =>
    /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/.test(url);

  const validateData = () => {
    // ✅ Phone: exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      alert("Phone number must be exactly 10 digits!");
      return false;
    }
  
    // ✅ Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return false;
    }
  
    // ✅ LinkedIn URL
    if (linkedin) {
      const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.*$/i;
      if (!linkedinRegex.test(linkedin)) {
        alert("Please enter a valid LinkedIn URL!");
        return false;
      }
    }
  
    // ✅ Website URL
    if (website) {
      const websiteRegex = /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/;
      if (!websiteRegex.test(website)) {
        alert("Please enter a valid Website URL!");
        return false;
      }
    }
  
    return true;
  };
  

  // Save to Firebase
  const saveChanges = async () => {
    if (!validateData()) return;

    try {
      const user = auth.currentUser;
      if (!user || !cardData?.id) return;

      const cardRef = doc(db, "cards", cardData.id);
      await updateDoc(cardRef, {
        "contactInfo.phone": phone,
        "contactInfo.email": email,
        "contactInfo.linkedin": linkedin,
        "contactInfo.website": website,
      });

      alert("Contact info updated ✅");
      setShowPersonalForm(false);
    } catch (error) {
      console.error("Error updating contact info:", error);
      alert("Failed to update contact info ❌");
    }
  };

  return (
    <div>
      {/* Bottom Slide-Up Form */}
      <section>
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-2xl p-6 transition-transform duration-300 ${
            showPersonalForm ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold text-black">Edit Personal Information</h2>
            <button onClick={() => setShowPersonalForm(false)} className="text-gray-500 text-xl">✖</button>
          </div>

          {/* Input Fields */}
          <div className="mb-4">
            <label className="text-gray-700 text-lg font-bold">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border rounded-xl text-gray-400 mt-1 h-16"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 text-lg font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="w-full px-3 py-2 border rounded-xl mt-1 h-16 text-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 text-lg font-bold">LinkedIn</label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-3 py-2 border rounded-xl mt-1 h-16 text-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 text-lg font-bold">Website</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://myportfolio.com"
              className="w-full px-3 py-2 border rounded-xl mt-1 h-16 text-gray-400"
            />
          </div>

          <button onClick={saveChanges} className="w-full bg-blue-600 text-white py-5 text-xl rounded-lg mt-2">
            Save Changes
          </button>
        </div>
      </section>

      {/* Display Section */}
      <section>
        <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center my-10 mb-0 justify-between">
          <div className="flex items-center gap-3">
            <Image src="/mobile_phone.png" width={50} height={50} alt="phone" />
            <div>
              <p className="text-gray-800 font-semibold text-lg">Phone</p>
              <p className="text-gray-400">+91 {phone || "91 80808080800"}</p>
            </div>
          </div>
          {userLogin && <SquarePen onClick={() => setShowPersonalForm(true)} className="text-black" />}
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between my-5">
          <div className="flex items-center gap-3">
            <Image src="/gmail.png" width={50} height={50} alt="email" />
            <div>
              <p className="text-gray-800 font-semibold text-lg">Email</p>
              <p className="text-gray-400">{email || "demo@mail.com"}</p>
            </div>
          </div>
          {userLogin && <SquarePen onClick={() => setShowPersonalForm(true)} className="text-black" />}
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between my-5">
          <div className="flex items-center gap-3">
            <Image src="/linkedin.png" width={50} height={50} alt="linkedin" />
            <div>
              <p className="text-gray-800 font-semibold text-lg">LinkedIn</p>
              <p className="text-gray-400">
  {cardData.contactInfo.linkedin
    ? cardData.contactInfo.linkedin.length > 30
      ? cardData.contactInfo.linkedin.slice(0, 30) + "..."
      : cardData.contactInfo.linkedin
    : "https://www.linkedin.com/xyz"}
</p>

            </div>
          </div>
          {userLogin && <SquarePen onClick={() => setShowPersonalForm(true)} className="text-black" />}
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between my-5">
          <div className="flex items-center gap-3">
            <Image src="/webside.png" width={50} height={50} alt="website" />
            <div>
              <p className="text-gray-800 font-semibold text-lg">Website</p>
              <p className="text-gray-400">{website || "https://www.techfami.com/"}</p>
            </div>
          </div>
          {userLogin && <SquarePen onClick={() => setShowPersonalForm(true)} className="text-black" />}
        </div>
      </section>
    </div>
  );
}
