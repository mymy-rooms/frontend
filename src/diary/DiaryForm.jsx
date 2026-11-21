import { useState } from "react";
import { emptyDiary } from "../common/data";
import Icon from "../common/Icon";

function Field({ label, required, children }) {
  return (
    <label className="diary-field">
      <span>
        {label}
        {required && <i>*</i>}
      </span>
      {children}
    </label>
  );
}

export default function DiaryForm({ diary, onClose, onSubmit }) {
  const [form, setForm] = useState(diary ? { ...diary } : { ...emptyDiary });

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.roomName.trim()) return;

    onSubmit({
      ...form,
      roomName: form.roomName.trim(),
      storeName: form.storeName.trim(),
      withs: form.withs.trim(),
      memo: form.memo.trim(),
    });
  };

  return (
    <div
      className="diary-modal"
      role="dialog"
      aria-modal="true"
      aria-label="방탈출 기록 작성"
    >
      <button
        className="diary-modal__backdrop"
        type="button"
        aria-label="닫기"
        onClick={onClose}
      />
      <section className="diary-sheet diary-form">
        <header className="diary-sheet__header">
          <div>
            <p>{diary ? "기록 다시 보기" : "오늘의 탈출"}</p>
            <h2>{diary ? "기록 수정" : "새 기록"}</h2>
          </div>
          <button
            type="button"
            className="diary-icon-button"
            onClick={onClose}
            aria-label="닫기"
          >
            <Icon name="close" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="diary-form__body">
          <Field label="방탈출 테마" required>
            <input
              required
              maxLength="80"
              value={form.roomName}
              onChange={(event) => update("roomName", event.target.value)}
              placeholder="테마 이름을 입력해 주세요"
            />
          </Field>

          <div className="diary-form__columns">
            <Field label="매장">
              <input
                value={form.storeName}
                onChange={(event) => update("storeName", event.target.value)}
                placeholder="매장 이름"
              />
            </Field>
            <Field label="함께한 사람">
              <input
                value={form.withs}
                onChange={(event) => update("withs", event.target.value)}
                placeholder="친구, 동료 등"
              />
            </Field>
          </div>

          <div className="diary-form__columns diary-form__ratings">
            <label className="diary-range">
              <span>
                <b>평점</b>
                <strong>{Number(form.score).toFixed(1)}</strong>
              </span>
              <input
                aria-label="평점"
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={form.score}
                onChange={(event) =>
                  update("score", Number(event.target.value))
                }
              />
            </label>
            <label className="diary-range">
              <span>
                <b>공포도</b>
                <strong>{Number(form.scary).toFixed(1)}</strong>
              </span>
              <input
                aria-label="공포도"
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={form.scary}
                onChange={(event) =>
                  update("scary", Number(event.target.value))
                }
              />
            </label>
          </div>

          <Field label="메모">
            <textarea
              rows="5"
              value={form.memo}
              onChange={(event) => update("memo", event.target.value)}
              placeholder="기억하고 싶은 순간, 힌트 수, 탈출 여부 등을 자유롭게 적어보세요."
            />
          </Field>

          <button
            className="diary-primary-button"
            type="submit"
            disabled={!form.roomName.trim()}
          >
            {diary ? "수정 완료" : "기록 저장"}
          </button>
        </form>
      </section>
    </div>
  );
}
