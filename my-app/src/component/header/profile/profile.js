import { IconChevron } from "../../general/icons/icon-chevron";
import { IconProfile } from "../../general/icons/icon-profile";
import css from "./profile.module.scss";
import { useState } from "react";

export const Profile = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);

  return (
    <div className={css.profile} onClick={() => {
        let arrow = document.querySelector("select");
          if (!arrow.classList.contains("profile_up__6h7Qi")) {
            arrow.style.outline = "none";
            arrow.style.rotate = "180deg";
          } else {
            arrow.style.rotate =
              "0deg";
              arrow.style.outline =
              "none";
          };
    setIsMenuShown(!isMenuShown)}
    }>
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
