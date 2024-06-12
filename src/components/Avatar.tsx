import { AllHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

interface AvatarProps extends AllHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean
}

export function Avatar({hasBorder, ...props}: AvatarProps) {
    return (
        <img
          className={hasBorder ? styles.avatarWithBorder : styles.avatar}
          {...props}
        />
    );
}