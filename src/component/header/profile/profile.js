import { IconProfile } from "../../general/icons/icon-profile";
import css from "./profile.module.scss";
import { useState } from "react";

export const Profile = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);

  return (
    <div
      className={css.profile}
      onClick={() => {
        setIsMenuShown(!isMenuShown);
      }}
    >
      <IconProfile />
      <select
        className={`${css.chevron} ${css.select} ${isMenuShown ? css.up : ""}`}
      ></select>

      {isMenuShown && (
        <div className={css.menu}>
          <option>Profile</option>
          <option>Log Out</option>
        </div>
      )}
    </div>
  );
};
