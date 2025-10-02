"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./ProfileAvatar.module.css";
import { User } from "@/types/user";
import { updateMe, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { toast } from 'react-hot-toast';

function getPhotoUrl(user: User): string | undefined {
  if ("photoUrl" in user && user.photoUrl) return user.photoUrl;
  if ("photoURL" in user && user.photoURL) return user.photoURL;
  return undefined;
}

export default function ProfileAvatar() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!user) return null;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('photoURL', file);
      
      await updateMe(formData);

      const updatedUser: User = await getMe();

      setUser(updatedUser);

      toast.success("Аватар оновлений");
    }
      catch (error) {
        toast.error("Помилка завантаження фото:");
      }
  }
  
  return (
    <div className={styles.profileWrapper}>
            <Image
              src={getPhotoUrl(user) || "/avatar-upload.svg"}
              alt={user.name || 'User avatar'}
              width={132}
              height={132}
              className={styles.avatarImage}
            />
        <div className={styles.infoPhotoUpload}>
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
          
          <label
            htmlFor="avatar-upload"
            className={styles.uploadButton}
          >
            Завантажити нове фото
          </label>
          <input
            id="avatar-upload"
            type="file"
            ref={fileInputRef}
            className={styles.hiddenInput}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
    </div>
  );
}