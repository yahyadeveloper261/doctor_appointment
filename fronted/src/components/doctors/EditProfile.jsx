import { useState } from "react";
import DoctorSidebar from "./DoctorSidebar";
import {  doctorProfile ,updateDoctorProfile, uploadDoctorImage} from "../../services/doctorApi";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function EditProfile() {
    const [selectedFile, setSelectedFile] = useState(null);
const [preview, setPreview] = useState("");
const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [fee,setFee]=useState("")
  const [city,setCity]=useState("");
  const [specialty,setSpecialty]=useState("");
  const [experience,setExperience]=useState("");
  const [rating,setRating]=useState("")
  const [image,setImage]=useState("");
  const navigate=useNavigate()
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    let imageUrl = image;

    // Agar new image select hui hai to pehle upload karo
    if (selectedFile) {
      const uploadData = await uploadDoctorImage(selectedFile);
      imageUrl = uploadData.imageUrl;
    }

    // Phir profile update karo
    const data = {
      name,
      fee: Number(fee),
      city,
      specialty,
      experience: Number(experience),
      image: imageUrl,
    };

    const profile = await updateDoctorProfile(data);

    setImage(imageUrl);
    setSelectedFile(null);
    setPreview("");

    console.log("Profile updated successfully", profile);
    alert("Profile updated successfully!");
navigate("/doctor/profile")
  } catch (error) {
    console.log(error);
    alert(error.message || "Profile update failed");
  } finally {
    setLoading(false);
  }
};

 useEffect(()=>{
    const getProfile=async()=>{
        try {
           const profile=await doctorProfile() 
          setName(profile.doctor.name)
          setFee(profile.doctor.fee)
          setCity(profile.doctor.city)
          setExperience(profile.doctor.experience)
          setSpecialty(profile.doctor.specialty)
          setRating(profile.doctor.rating);
          setImage(profile.doctor.image)
        } catch (error) {
            
        }
    }
    getProfile();
 },[])

 return (
  <div className="flex min-h-screen bg-gray-50">
    <DoctorSidebar />

    <main className="flex-1 p-6 md:p-10">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">
        Edit Profile
      </h1>

      <p className="mb-8 text-gray-500">
        Update your professional information
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-sm"
      >
        {/* Name */}
        <div>
          <label className="mb-2 block font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-teal-600"
            required
          />
        </div>

        {/* Specialty */}
        <div>
          <label className="mb-2 block font-medium">Specialty</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-teal-600"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="mb-2 block font-medium">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-teal-600"
            required
          />
        </div>

        {/* Experience */}
        <div>
          <label className="mb-2 block font-medium">
            Experience (years)
          </label>
          <input
            type="number"
            min="0"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-teal-600"
            required
          />
        </div>

        {/* Fee */}
        <div>
          <label className="mb-2 block font-medium">
            Consultation Fee
          </label>
          <input
            type="number"
            min="0"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-teal-600"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="mb-2 block font-medium">
            Rating
          </label>
          <input
            type="number"
            value={rating}
            readOnly
            className="w-full rounded-lg border bg-gray-100 p-3 text-gray-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Rating profile se read-only hai; ise doctor manually change nahi karega.
          </p>
        </div>

        {/* Current Image */}
        <div>
  <label className="mb-2 block font-medium">
    Profile Image
  </label>

  {(preview || image) && (
    <img
      src={preview || image}
      alt="Doctor profile"
      className="mb-3 h-28 w-28 rounded-xl border object-cover"
    />
  )}

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (file) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      }
    }}
    className="w-full rounded-lg border p-3"
  />

  <p className="mt-2 text-sm text-gray-500">
    Select a new image from your computer.
  </p>
</div>

       <button
  type="submit"
  disabled={loading}
  className="w-full rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800 disabled:opacity-50"
>
  {loading ? "Saving..." : "Save Changes"}
</button>
      </form>
    </main>
  </div>
);
}
