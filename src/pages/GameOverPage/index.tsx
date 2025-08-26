import cls from "./styles.module.scss";

export const GameOverPage = () => {
  return (
    <div className={cls.startContainer}>
      <p>Game Over</p>
      <button>Start again</button>
    </div>
  );
};
