"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { app, db } from "../../config/firebase_config"; // your Firebase config
import { ChevronsDown, CirclePlus, LogOut, SquarePen } from "lucide-react";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import EditContactForm from "../../component/EditContactForm";
import EditSocialMediaForm from "../../component/EditSocialMedia";
import EditCardDetails from "../../component/EditCardDetails";
export default function Page() {
  const router = useRouter();
  const authInstance = getAuth();

  const [loading, setLoading] = useState(true);
  const [userLogin, setUserLogin] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [cardData, setCardData] = useState<any>(null);


  // ✅ Contact Info State
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    linkedin: "",
    website: "",
  });

  // ✅ Social Media State
  const [formSocial, setFormSocial] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
    website: "",
  });


 


  /* ----------------------------- FIREBASE FETCHING ---------------------------- */
  const getUserData = async () => {
    const user = authInstance.currentUser;
    if (!user) return null;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      setUserData(data);
      return data;
    }
    return null;
  };

  const fetchCardData = async (cardId: string) => {
    const cardRef = doc(db, "cards", cardId);
    const cardSnap = await getDoc(cardRef);
    if (cardSnap.exists()) {
      const data = cardSnap.data();
      setCardData(data);

      // Set form default values
      setContactInfo(data.contactInfo || {});
      setFormSocial(data.socialMedia || {});
    }
    setLoading(false);
  };

  /* --------------------------- AUTH & INITIAL FETCH --------------------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      if (!user) {
        setUserLogin(false);
        router.replace("/auth/login");
      } else {
        setUserLogin(true);
        const data = await getUserData();
        if (data?.cardId) fetchCardData(data.cardId);
      }
    });
    return () => unsubscribe();
  }, []);

  /* ------------------------------- UTILITIES --------------------------------- */

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      signOut(authInstance)
        .then(() => {
          router.push("../auth/login"); // redirect after logout
        })
        .catch((err) => console.error(err));
    }
  };

  if (loading) return <p className="text-center mt-10">Loading... </p>;
  return(
    <div className=" flex justify-center items-center bg-gray-50">
      <div className="w-[420px] bg-gradient-to-b from-[#BDDCFF] to-[#E5F1FA]  p-2"> 
        <div className=" flex justify-between pl-5 pr-5"> <h1> Dashboard </h1> <div onClick={handleLogout} className="bg-red-400 p-3 font-bold rounded-lg flex gap-2">Logout  <LogOut /></div></div>
        
      <EditCardDetails cardData={cardData}  userLogin={userLogin} userId={userData.uid} />

       <EditContactForm cardData={cardData}  userLogin={userLogin}/>

       <EditSocialMediaForm cardData={cardData}  userLogin={userLogin} />


  


     {/* footer section  */}
      <section >
          <p className="text-gray-400 text-center my-10 mb-0">Powered by </p>
          <h1 className=" text-2xl font-bold text-gray-400 text-center">Pixel card</h1>
      </section>


         </div>
         
      </div>

  ) 
}
