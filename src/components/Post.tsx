import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState, InvalidEvent, ChangeEvent, FormEvent } from "react";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import { AuthorType, ContentsType } from "../App";

import styles from "./Post.module.css";

interface PostProps {
  author: AuthorType
  contents: ContentsType[]
  publishedAt: Date
}

export function Post({ publishedAt, author, contents }: PostProps) {
  const [commentTextValue, setCommentTextValue] = useState("");
  const [comments, setComments] = useState([
    "Muito bom Devon, parabéns!! 👏👏",
  ]);

  const publishedDataFormatted = format(
    publishedAt,
    "d 'de' MMMM 'ás' HH':'mm'h'", {
    locale: ptBR,
  });

  const publishedDataRelativeNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setCommentTextValue(event.target.value);

    event.target.setCustomValidity("");
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, commentTextValue]);

    setCommentTextValue("");
  }

  function deleteComment(commentToDelete: string) {
    const commentWithoutToDelete = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(commentWithoutToDelete);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  const isNewCommentEmpty = commentTextValue.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDataFormatted}
          dateTime={publishedAt.toISOString()}>
          {publishedDataRelativeNow}
        </time>
      </header>

      <div className={styles.content}>
        {contents.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          }
          return (
            <p key={line.content}>
              <a href="#">{line.content}</a>
            </p>
          );
        })}
        <p>
          <a href="#">#novoprojeto</a> <a href="#">#nlw</a>{" "}
          <a href="#"> #rocketseat</a>
        </p>
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.CommentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          onChange={handleNewCommentChange}
          placeholder="Deixe um comentario"
          value={commentTextValue}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.CommentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
