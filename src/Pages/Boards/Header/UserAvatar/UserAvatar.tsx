import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import config from "../../../../Constants";
import { useTypeSelector } from "../../../../Redux/TypeHook";
import { notificationAntd } from "../../../../Redux/User/UserSlice";
import s from "./UserAvatar.module.css";

export const UserAvatar = (): JSX.Element => {
  const { handleSubmit } = useForm({ mode: "onBlur" });
  const userId = useTypeSelector((s) => s.user.id);
  const apiUrl = config.apiUrl;

  const fileInput = useRef<HTMLInputElement>(null);
  const [imgKey, setImgKey] = useState(new Date().toString());
  const [errorLoadedAvatar, setErrorLoadedAvatar] = useState(false);

  const onSubmit = async () => {
    if (fileInput.current?.files) {
      const file = fileInput.current?.files[0];
      const formData = new FormData();
      // check format
      if (!file.name.includes(".jpg" || ".png")) {
        alert("file must be .jpg or .png format");
        return;
      }
      // get value after dot
      const fileFormat = file.name.match(/[^\.]*$/);
      const fileName = `user-avatar-main-${userId}.${fileFormat}`;
      const token = localStorage.getItem("token") || undefined;

      formData.append("picture", file, fileName);
      try {
        const { data } = await axios.post(`${apiUrl}files/userAvatars`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (ProgressEvent: any) => {
            console.log(
              "Upload Progress: " +
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                "%",
            );
          },
        });

        setImgKey(new Date().toString());
        setErrorLoadedAvatar(false);
        console.log("response from server: ", data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err.response);
          const payload = err.response?.data;
          notificationAntd({ payload, status: false });
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.background} refresh-avatar-Tooltip="click to upload avatar">
          <label htmlFor="avatar">
            {errorLoadedAvatar ? (
              <img src="user_avatar_default.png" className={s.avatar} alt="default user avatar" />
            ) : (
              <img
                key={imgKey}
                src={`${config.apiUrl}files/userAvatars/user-avatar-main-${userId}.jpg`}
                onError={() => setErrorLoadedAvatar(true)}
                className={s.avatar}
                alt="user avatar"
              />
            )}
          </label>
          <input
            type="file"
            id="avatar"
            name="picture"
            multiple
            ref={fileInput}
            className={s.hiddenInput}
            onChange={onSubmit}
          />
        </div>
      </form>
    </>
  );
};
