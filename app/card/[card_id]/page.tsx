"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase_config";
import { ExternalLink, Nfc,Instagram, Facebook, SquarePen, CirclePlus, ChevronsDown, Router} from 'lucide-react';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../../../config/firebase_config"; 
import Image from "next/image"; 
import { useRouter } from "next/navigation";

export default function CardPage() {
  const router = useRouter();
  const { card_id } = useParams();
  const [cardData, setCardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUnactive, setIsUnactive] = useState(false);
  const [userLogin, setUserLogin] = useState<any>(null);

  const getInitials = (fullName: string): string => {
    if (!fullName) return "NA";
  
    const words = fullName.trim().split(/\s+/); // handles extra spaces
  
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase(); // First 2 letters
    }
  
    return (words[0][0] + words[1][0]).toUpperCase(); // First letters of first and second words
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
       setUserLogin(false);
      } else {
        setUserLogin(true);
      }
    });

    return () => unsubscribe();
  }, [auth]);


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



  return (
    <div className="min-h-screen bg-white flex justify-center items-center  ">
    <div className="bg-gradient-to-b from-[#BDDCFF] to-[#E5F1FA]    w-full max-w-md  overflow-hidden p-2 shadow-lg">
  

      <div className="w-full h-56 border border-amber-50 rounded-2xl shadow-xl  my-20 mb-10 bg-white" > 
          <div className="flex justify-center"> 
          <div className="w-36 h-36 bg-gray-400 border-5 rounded-full  border-white border-w-2 my-[-60px] flex justify-center items-center"> 
            <h1 className=" text-white text-3xl ">{getInitials(cardData?.cardInfo.name || "")}</h1>
          </div>
          </div>

          <div className="flex flex-col justify-center items-center mt-12">
          <h1 className=" text-black text-2xl font-bold mt-4">{cardData.cardInfo.name || "Jane Cooper"}</h1>
          <p className=" text-black text-md mt-1"> {cardData.cardInfo.headline|| "Web Developer | Designer"}</p>
          <p className="text-black text-sm mt-2">{cardData.cardInfo.location || "xyx company"}  </p>
          </div>
         </div> 
  
         {userLogin && cardData.socialMedia==null &&
         <div onClick={()=> router.push('/dashboard')} className="px-4 py-2 border-2 flex justify-center cursor-pointer  items-center gap-5 h-12 border-dashed border-black text-black text-lg rounded-xl text-center">
            <h1> Add Social Media  </h1> <CirclePlus />
          </div> }


         {/* // prosanl info section */}
                 <a href={`tel:+91${cardData.contactInfo.phone || "8080973373"}`} target="_blank" rel="noopener noreferrer">
                 <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center my-10 mb-0 justify-between hover:scale-[1.02] transition cursor-pointer ">
                 {/* Left side: Image + Text */}
                  <div className="flex items-center gap-3">
                    <Image src="/mobile_phone.png" width={50} height={50} alt="nfc card" />
                     <div>
                   <p className="text-gray-800 font-semibold text-lg">Phone</p>
                   <p className="text-gray-400">+91 {cardData.contactInfo.phone || "8080973373"}</p>
                   </div>
                   </div>
                   
        
                 {/* Right side: Arrow Image */}
                 
                 <Image src="/right-up-allow.png" width={25} height={25} alt="arrow" />
                </div>
                </a>
        
                <a href={`mailto:${cardData.contactInfo.email || "demo@email.com"}`} target="_blank" rel="noopener noreferrer">  
                <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between my-5 hover:scale-[1.02] transition cursor-pointer  ">
                 {/* Left side: Image + Text */}
                  <div className="flex items-center gap-3">
                  <Image src="/gmail.png" width={50} height={50} alt="nfc card" />
                   <div>
                  <p className="text-gray-800 font-semibold text-lg">Email</p>
                  <p className="text-gray-400">{cardData.contactInfo.email || "xyz@mail.com"}</p>
                   </div>
                   </div>
        
                 {/* Right side: Arrow Image */}
                
                 <Image src="/right-up-allow.png" width={25} height={25} alt="arrow" />
                
                </div>
                </a>
        
                <a href={cardData.contactInfo.linkedin || "#"} target="_blank" rel="noopener noreferrer">
                <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between my-5 hover:scale-[1.02] transition cursor-pointer">
                 {/* Left side: Image + Text */}
                  <div className="flex items-center gap-3">
                  <Image src="/linkedin.png" width={50} height={50} alt="nfc card" />
                   <div>
                  <p className="text-gray-800 font-semibold text-lg">Linkedin</p>
                  <p className="text-gray-400">
                {cardData.contactInfo.linkedin ? cardData.contactInfo.linkedin.length > 25 ? cardData.contactInfo.linkedin.slice(0, 25) + "..."
              : cardData.contactInfo.linkedin: "https://www.linkedin.com/xyz"}</p>
                   </div>
                   </div>
        
                 {/* Right side: Arrow Image */}
                 
                 <Image src="/right-up-allow.png" width={25} height={25} alt="arrow" />
                </div>
                </a>
        
                <a href={cardData.contactInfo?.website || "#"} target="_blank" rel="noopener noreferrer">
                <div className="bg-white p-4 rounded-2xl  shadow-lg flex items-center justify-between my-5 hover:scale-[1.02] transition cursor-pointer">
                 {/* Left side: Image + Text */}
                  <div className="flex items-center gap-3">
                  <Image src="/webside.png" width={50} height={50} alt="nfc card" />
                   <div>
                  <p className="text-gray-800 font-semibold text-lg">Webside</p>
                  <p className="text-gray-400">{cardData.contactInfo?.webside ? cardData.contactInfo?.website.length > 25 ? cardData.contactInfo.linkedin.slice(0, 25) + "..."
              : cardData.contactInfo.website: "https://www.xyz.com/"}</p>
                   </div>
                   </div>
        
                 {/* Right side: Arrow Image */}
                 
                 <Image src="/right-up-allow.png" width={25} height={25} alt="arrow" />
                </div>
                </a>

  
                {cardData.socialMedia && (
  <div className="flex flex-col items-center gap-6 my-10 ">
     <div className="px-4 py-2 border w-full flex justify-center  items-center gap-5 h-12 border-dashed border-white text-white rounded-xl text-center">
            <h1>  Social Media  </h1>     <ChevronsDown />
          </div>

    {[
      { name: "Instagram", icon: "/instagram.png", value: cardData.socialMedia.instagram },
      { name: "Website", icon: "/facebook.png", value: cardData.socialMedia.website },
      { name: "Twitter", icon: "/twitter.png", value: cardData.socialMedia.twitter },
    ].map((item, index) => (
      <a
        key={index}
        href={item.value || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between w-full max-w-md hover:scale-[1.02] transition cursor-pointer"
      >
        {/* Left Side */}
        <div className="flex  gap-3">
          <Image src={item.icon} width={50} height={50} alt={item.name} />
          <div>
            <p className="text-gray-800 font-semibold text-lg">{item.name}</p>
            <p className="text-gray-400 max-w-[180px] truncate">
              {item.value || "Not added"}
            </p>
          </div>
        </div>

        {/* Right Side - Edit or Arrow */}
        {userLogin ? (
          <SquarePen
            onClick={(e) => e.preventDefault()} // Prevent link opening while editing
            className="text-black"
          />
        ) : (
          <Image src="/right-up-allow.png" width={25} height={25} alt="arrow" />
        )}
      </a>
    ))}
  </div>
)}





    <p className="text-gray-400 text-center my-10 mb-0 text-sm">Powered by </p>
      <h1 className=" text-2xl font-bold text-gray-400 text-center mb-5">Pixel card</h1>

    </div>
  </div>
      
  
  
  );
}
