import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import config from "../../../../Constants";
import { useTypeSelector } from "../../../../Redux/TypeHook";
import { notificationAntd, onSetUserAvatar } from "../../../../Redux/User/UserSlice";
import s from "./UserAvatar.module.css";

export const UserAvatar = (): JSX.Element => {
  const avatar_url = useTypeSelector((state) => state.user.avatar_url);
  const dispatch = useDispatch();
  const { handleSubmit } = useForm({ mode: "onBlur" });
  const userId = useTypeSelector((s) => s.user.id);
  const apiUrl = config.apiUrl;
  const fileInput = useRef<HTMLInputElement>(null);
  

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
      const fileName = `user-avatar-main-${userId}-${Date.now()}.${fileFormat}`;
      const token = localStorage.getItem("token") || undefined;

      formData.append("picture", file, fileName);
      try {
        const { data } = await axios.post<{ link: string }>(
          `${apiUrl}files/userAvatars`,
          formData,
          {
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
          },
        );

        dispatch(onSetUserAvatar({ avatar_url: data.link }));
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
            {avatar_url ? (
              <img src={avatar_url} className={s.avatar} alt="user avatar" />
            ) : (
              <img src="user_avatar_default.png" className={s.avatar} alt="default user avatar" />
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
