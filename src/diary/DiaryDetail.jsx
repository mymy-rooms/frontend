import { useState } from "react";
import Icon from "../common/Icon";

export default function DiaryDetail({ diary, onClose, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div
      className="diary-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${diary.roomName} 상세 기록`}
    >
      <button
        className="diary-modal__backdrop"
        type="button"
        aria-label="닫기"
        onClick={onClose}
      />
      <article className="diary-sheet diary-detail">
        <div className="diary-detail__heading">
          <div>
            <p>{diary.storeName || "매장 미입력"}</p>
            <h2>{diary.roomName}</h2>
          </div>
          <button
            type="button"
            className="diary-icon-button"
            onClick={onClose}
            aria-label="닫기"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="diary-detail__scores">
          <div>
            <small>평점</small>
            <strong>
              <Icon name="star" className="diary-detail__star" />
              {diary.score?.toFixed(1) ?? "-"}
            </strong>
          </div>
          <div>
            <small>공포도</small>
            <strong>
              {diary.scary?.toFixed(1) ?? "-"}
              <i>/ 5</i>
            </strong>
          </div>
        </div>

        {diary.withs && (
          <div className="diary-detail__section">
            <small>함께한 사람</small>
            <p>{diary.withs}</p>
          </div>
        )}

        <div className="diary-detail__section diary-detail__memo">
          <small>메모</small>
          <p>{diary.memo || "아직 남긴 메모가 없어요."}</p>
        </div>

        {confirmDelete ? (
          <div className="diary-delete">
            <strong>이 기록을 삭제할까요?</strong>
            <p>삭제한 기록은 되돌릴 수 없어요.</p>
            <div>
              <button type="button" onClick={() => setConfirmDelete(false)}>
                취소
              </button>
              <button type="button" onClick={() => onDelete(diary.diaryId)}>
                삭제
              </button>
            </div>
          </div>
        ) : (
          <div className="diary-detail__actions">
            <button type="button" onClick={() => setConfirmDelete(true)}>
              삭제
            </button>
            <button type="button" onClick={() => onEdit(diary)}>
              <Icon name="pencil" />
              수정하기
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
