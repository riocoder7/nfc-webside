"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase_config";
import { ExternalLink, Nfc,Instagram, Facebook, } from 'lucide-react';


export default function CardPage() {
  const { card_id } = useParams();
  const [cardData, setCardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUnactive, setIsUnactive] = useState(false);

  const getInitials = (fullName: string): string => {
    if (!fullName) return "NA";
  
    const words = fullName.trim().split(/\s+/); // handles extra spaces
  
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase(); // First 2 letters
    }
  
    return (words[0][0] + words[1][0]).toUpperCase(); // First letters of first and second words
  };
  

  useEffect(() => {
    if (!card_id) return;

    const fetchCard = async () => {
      try {
        const cardRef = doc(db, "cards", card_id as string);
        const cardSnap = await getDoc(cardRef);

        if (cardSnap.exists()) {
          const data = cardSnap.data();
          setCardData(data);

          if (data.status === "unactive") {
            setIsUnactive(true);
            setTimeout(() => {
              window.location.href =
                "https://play.google.com/store/apps/details?id=com.yourapp.package";
            }, 5000);
          }
        }
      } catch (err) {
        console.error("Error fetching card:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [card_id]);

  if (!card_id || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        Loading card...
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 text-xl">
        Error to fetch card data. Please check the card ID or try again later.
      </div>
    );
  }

  if (isUnactive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-6 text-white text-center">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl max-w-xl w-full shadow-xl space-y-6">
          <h1 className="text-3xl font-bold text-red-400">Incomplete Profile</h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Your profile is not complete. Please download our app, sign up, edit your
            profile, and write the URL on your NFC card.
          </p>
          <p className="text-base text-gray-400 italic">
            Redirecting to Play Store in 5 seconds...
          </p>
        </div>
      </div>
    );
  }

  // // Avatar initials
  // const initials = cardData.cardOwner
  //   .split(" ")
  //   .map((n: string) => n[0])
  //   .join("")
  //   .toUpperCase();

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-2 py-5">
    <div className="bg-gray-100  rounded-3xl w-full max-w-md  overflow-hidden">
  
      {/* Header with logo and profile */}
      <div className="relative">
        {/* Card Header BG */}
        <div className="bg-neutral-900 h-52 flex gap-2 items-center justify-center rounded-b-3xl">
            <h1 className="text-white font-semibold text-2xl tracking-wider">NXTCard</h1>
          <Nfc />
        </div>
        {/* Profile Image */}
        <div
          className="absolute bg-gray-400 -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-24 h-24 rounded-full border-2"
          style={{ borderColor: cardData.borderColor || "#fff" }}
        >
         {getInitials(cardData?.cardOwner || "")}
            
        </div>
      </div>
  
      {/* Profile Info */}
      <div className="pt-12 pb-6 px-6 text-center">
        <h2 className="text-2xl text-gray-900 ">{cardData.cardOwner || "Jane Cooper"}</h2>
        <p className="text-md text-gray-600">CEO & Founder</p>
        <p className="text-md text-gray-600">Stag Technologies</p>
  
        {/* Open Hours */}
        <div className="mt-5">
          <span className="bg-green-100 text-green-700 text-xs font-medium px-5 py-2 rounded-md ">
            Open 9AM – 6PM
          </span>
        </div>
  
        {/* Save Contact Button */}
        <button className="mt-4 bg-amber-600 text-white shadow-md font-semibold px-6 py-2 rounded-md shadow hover:bg-amber-700 transition">
          Save Contact
        </button>
      </div>
  
      {/* Contact & Social Section */}
<div className="bg-gray-100 px-6 pb-8 space-y-4">

{/* Phone */}
<div className="flex items-center justify-between bg-white rounded-xl shadow p-3">
  <div className="flex items-center">
    <img src="https://img.icons8.com/ios-filled/50/26e07f/phone.png" className="w-6 h-6 mr-3" />
    <div>
      <p className="text-gray-800 font-semibold">Phone</p>
      <p className="text-sm text-gray-600">+91 {cardData.phone || "8080973373"}</p>
    </div>
  </div>
  <a href={`tel:+91${cardData.phone || "8080973373"}`} target="_blank" rel="noopener noreferrer">
    <ExternalLink className="w-5 h-5 text-gray-500" />
  </a>
</div>

{/* Email */}
<div className="flex items-center justify-between bg-white rounded-xl shadow p-3">
  <div className="flex items-center">
    <img src="https://img.icons8.com/ios-filled/50/4e91fc/new-post.png" className="w-6 h-6 mr-3" />
    <div>
      <p className="text-gray-800 font-semibold">Email</p>
      <p className="text-sm text-gray-600">{cardData.email || "demo@email.com"}</p>
    </div>
  </div>
  <a href={`mailto:${cardData.email || "demo@email.com"}`} target="_blank" rel="noopener noreferrer">
    <ExternalLink className="w-5 h-5 text-gray-500" />
  </a>
</div>

{/* LinkedIn */}
<div className="flex items-center justify-between bg-white rounded-xl shadow p-3">
  <div className="flex items-center">
    <img src="https://img.icons8.com/ios-filled/50/0077b5/linkedin.png" className="w-6 h-6 mr-3" />
    <div>
      <p className="text-gray-800 font-semibold">LinkedIn</p>
      <p className="text-sm text-gray-600 truncate">{cardData.linkedin || "linkedin.com/in/demo"}</p>
    </div>
  </div>
  <a href={cardData.linkedin || "#"} target="_blank" rel="noopener noreferrer">
    <ExternalLink className="w-5 h-5 text-gray-500" />
  </a>
</div>



{/* Social Media */}
<div>
  <p className="text-sm font-semibold text-gray-700 mb-2">Social Media Links</p>
  <div className="space-y-2">

    {/* Instagram */}
    {cardData.instagram && (
      <div className="flex items-center justify-between bg-white rounded-xl p-3 text-gray-800 font-medium shadow hover:bg-gray-200 transition">
        <div className="flex items-center gap-2">
          <Instagram className="w-5 h-5 text-pink-500" />
          <span>Instagram</span>
        </div>
        <a href={cardData.instagram} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-5 h-5 text-gray-500" />
        </a>
      </div>
    )}

    {/* Facebook */}
    {cardData.facebook && (
      <div className="flex items-center justify-between bg-white rounded-xl p-3 text-gray-800 font-medium shadow hover:bg-gray-200 transition">
        <div className="flex items-center gap-2">
          <Facebook className="w-5 h-5 text-blue-600" />
          <span>Facebook</span>
        </div>
        <a href={cardData.facebook} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-5 h-5 text-gray-500" />
        </a>
      </div>
    )}

  </div>
</div>
</div>

    </div>
  </div>
  
  
  );
}
