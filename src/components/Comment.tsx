import { useState } from "react";

import { Trash, ThumbsUp } from "@phosphor-icons/react";

import styles from "./Comment.module.css";
import { Avatar } from "./Avatar";

interface CommentProps {
  content: string;
  onDeleteComment: (commentToDelete: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likesCount, setLikesCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikesComment() {
    setLikesCount((state) => {
      return state + 1
    })
  }

  return (
    <div className={styles.comment}>
      <Avatar
        src="https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
      />

      <header className={styles.commentHeader}>
        <div className={styles.authorAndTime}>
          <strong>Matheus Melo</strong>
          <time dateTime="24-05-2024 as 13:54">Cerca de 2h atrás</time>
        </div>
        <button onClick={handleDeleteComment} title="Apagar comentario" type="button">
          <Trash size={24} />
        </button>
      </header>

      <p className={styles.commentContent}>{content}</p>

      <footer onClick={handleLikesComment} className={styles.commentLike}>
        <ThumbsUp size={20} />
        Aplaudir<span>{likesCount}</span>
      </footer>
    </div>
  );
}
