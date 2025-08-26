import cls from "./styles.module.scss";

export const GameHub = () => {
  return (
    <div className={cls.gameHub}>
      <div>
        Buy: <span id="money"></span>$
      </div>

      <div className={cls.buyContainer}>
        <button id="buy-tower">Tower</button>
      </div>
    </div>
  );
};
