import React, { useState,useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import avatar from "../assets/round-account-button-with-user-inside.png";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile,checkAuth } = useAuthStore();
  const [formattedDate, setFormattedDate] = useState("Loading...");

  useEffect(() => {
    checkAuth();
  },[]);

  useEffect(() => {
    if (authUser?.createdAt) {
      setFormattedDate(authUser.createdAt.split("T")[0]);
    }
  }, [authUser]);

  const compressImage = (file, maxWidth = 500, maxHeight = 500) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height *= maxWidth / width;
              width = maxWidth;
            } else {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const compressUntilSize = (quality) => {
            return new Promise((resolveCompression) => {
              canvas.toBlob(
                async (blob) => {
                  if (blob.size <= 48 * 1024 || quality <= 0.1) {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = () => resolveCompression(reader.result);
                  } else {
                    resolveCompression(await compressUntilSize(quality - 0.05));
                  }
                },
                "image/jpeg",
                quality
              );
            });
          };

          compressUntilSize(0.8).then(resolve).catch(reject);
        };
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressedBase64 = await compressImage(file);
      await updateProfile({ profilePic: compressedBase64 }); 
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            {/* <p className="mt-2">Your Profile Information</p> */}
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={authUser.profilePic || avatar}
                alt="Profile"
                className="size-32 rounded-full object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                absolute bottom-0 right-0
                bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer
                transition-all duration-200
                ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }  
              `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400 font-medium mt-7">
              {isUpdatingProfile
                ? "Uploading"
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2 font-medium" >
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2 font-medium ">
                <Mail className="w-4 h-4" />
                Email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2">
                <span>Member Since</span>
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
