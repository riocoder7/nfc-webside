"use client";

import { ChevronsDown, CirclePlus, SquarePen } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase_config";
import { getAuth } from "firebase/auth";

interface EditContactFormProps {
  cardData: any;
  userLogin?: boolean;
}

export default function EditSocialMediaForm({ userLogin, cardData }: EditContactFormProps) {
  const socialMediaList = [
    { name: "Instagram", key: "instagram", icon: "/instagram.png" },
    { name: "Facebook", key: "facebook", icon: "/facebook.png" },
    { name: "X", key: "X", icon: "/twitter.png" },
  ];

  const [showForm, setShowForm] = useState(false);
  const [socialData, setSocialData] = useState({
    instagram: cardData.socialMedia?.instagram || "",
    facebook: cardData.socialMedia?.facebook || "",
    twitter: cardData.socialMedia?.twitter || "",
  });

  const auth = getAuth();

  // ✅ Validate URL
  const isValidUrl = (url: string) =>
    /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/.test(url);

  const validateSocialData = () => {
    for (let key in socialData) {
      if (socialData[key as keyof typeof socialData] && !isValidUrl(socialData[key as keyof typeof socialData])) {
        alert(`${key.charAt(0).toUpperCase() + key.slice(1)} URL is invalid!`);
        return false;
      }
    }
    return true;
  };

  const saveSocialData = async () => {
    if (!validateSocialData()) return;

    try {
      const user = auth.currentUser;
      if (!user || !cardData?.id) return;

      const cardRef = doc(db, "cards", cardData.id);
      await updateDoc(cardRef, { socialMedia: socialData });

      alert("Social Media Updated ✅");
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update social media ❌");
    }
  };

  return (
    <div>

         {userLogin && !cardData.socialMedia &&
                 <div onClick={() => setShowForm(true)} className="px-4 py-2 border-2 flex justify-center cursor-pointer  items-center gap-5 h-12 border-dashed border-black text-black text-lg rounded-xl text-center">
                    <h1 className="test-black"> Add Social Media  </h1> <CirclePlus />
                  </div> }
      {/* Slide-Up Form */}
      <section>
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-2xl p-6 transition-transform duration-300 ${
            showForm ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold text-black">Edit Social Media Links</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-500 text-2xl">✖</button>
          </div>

          {socialMediaList.map((item) => (
            <div key={item.key} className="mb-4">
              <label className="text-gray-700 text-lg font-bold">{item.name}</label>
              <input
                type="text"
                value={socialData[item.key as keyof typeof socialData]}
                placeholder={`Enter ${item.name} Link`}
                onChange={(e) =>
                  setSocialData((prev) => ({ ...prev, [item.key]: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-xl mt-1 text-gray-400 h-16"
              />
            </div>
          ))}

          <button
            onClick={saveSocialData}
            className="w-full bg-blue-600 text-white py-5 rounded-xl mt-2 text-xl"
          >
            Save Changes
          </button>
        </div>
      </section>

      {/* Display Section (UI unchanged) */}
      <section> 
        {cardData.socialMedia && 
        
      <> 
        {userLogin && (
          <div className="px-4 py-2  flex justify-center items-center gap-5 h-12 border-dashed border-black border-2 text-black text-lg rounded-xl text-center">
            <h1>Social Media</h1> <ChevronsDown />
          </div>
        )}

        {/* Instagram */}
        <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between my-5">
          <div className="flex items-center gap-3">
            <Image src="/instagram.png" width={50} height={50} alt="instagram" />
            <div>
              <p className="text-gray-800 font-semibold text-lg">Instagram</p>
              <p className="text-gray-400">
                {cardData.socialMedia?.instagram
                  ? cardData.socialMedia.instagram.length > 30
                    ? cardData.socialMedia.instagram.slice(0, 30) + "..."
                    : cardData.socialMedia.instagram
                  : "https://www.instagram.com/xyz"}
              </p>
            </div>
          </div>
          {userLogin && <SquarePen onClick={() => setShowForm(true)} className="text-black" />}
        </div>

        {/* Facebook */}
        <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between my-5">
          <div className="flex items-center gap-3">
            <Image src="/facebook.png" width={50} height={50} alt="facebook" />
            <div>
              <p className="text-gray-800 font-semibold text-lg">Facebook</p>
              <p className="text-gray-400">
                {cardData.socialMedia?.facebook || "https://www.facebook.com/xyz"}
              </p>
            </div>
          </div>
          {userLogin && <SquarePen onClick={() => setShowForm(true)} className="text-black" />}
        </div>

        {/* Twitter */}
        <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between my-5">
          <div className="flex items-center gap-3">
            <Image src="/twitter.png" width={50} height={50} alt="twitter" />
            <div>
              <p className="text-gray-800 font-semibold text-lg">X</p>
              <p className="text-gray-400">
                {cardData.socialMedia?.twitter || "https://www.twitter.com/xyz"}
              </p>
            </div>
          </div>
          {userLogin && <SquarePen onClick={() => setShowForm(true)} className="text-black" />}
        </div>
        </>
      }
      </section>
    </div>
  );
}
