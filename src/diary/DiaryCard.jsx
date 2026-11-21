import Icon from "../common/Icon";

function Score({ type, label, value }) {
  return (
    <span className="diary-card__score">
      {type === "star" ? (
        <Icon name="star" className="diary-card__star" />
      ) : (
        <span className="diary-card__scary" aria-hidden="true">
          !
        </span>
      )}
      <span className="sr-only">{label}</span>
      {value?.toFixed(1) ?? "-"}
    </span>
  );
}

export default function DiaryCard({ diary, onClick }) {
  return (
    <button type="button" className="diary-card" onClick={() => onClick(diary)}>
      <span className="diary-card__thumb">{diary.roomName.slice(0, 1)}</span>
      <span className="diary-card__content">
        <span className="diary-card__top">
          <span className="diary-card__titles">
            <strong>{diary.roomName}</strong>
            <small>{diary.storeName || "매장 미입력"}</small>
          </span>
          <Icon name="chevron" className="diary-card__chevron" />
        </span>
        <span className="diary-card__bottom">
          <Score type="star" label="평점" value={diary.score} />
          <Score type="scary" label="공포도" value={diary.scary} />
          {diary.withs && (
            <small className="diary-card__with">with {diary.withs}</small>
          )}
        </span>
      </span>
    </button>
  );
}
