import cls from "./styles.module.scss";

export const NextLevelPage = () => {
  return (
    <div>
      <div className={cls.startContainer}>
        <p>You win</p>
        <button>Next level</button>
      </div>
    </div>
  );
};
