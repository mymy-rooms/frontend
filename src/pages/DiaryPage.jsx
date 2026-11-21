import { useMemo, useState } from "react";
import DiaryCard from "../diary/DiaryCard";
import DiaryDetail from "../diary/DiaryDetail";
import DiaryForm from "../diary/DiaryForm";
import Icon from "../common/Icon";
import { sampleDiaries } from "../common/data";
import "../diary/diary.css";

export default function DiaryPage() {
  const [diaries, setDiaries] = useState(sampleDiaries);
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [editingDiary, setEditingDiary] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const averageScore = useMemo(() => {
    if (!diaries.length) return "0.0";
    const total = diaries.reduce(
      (sum, diary) => sum + Number(diary.score || 0),
      0,
    );
    return (total / diaries.length).toFixed(1);
  }, [diaries]);

  const openCreateForm = () => {
    setEditingDiary(null);
    setIsFormOpen(true);
  };

  const openEditForm = (diary) => {
    setSelectedDiary(null);
    setEditingDiary(diary);
    setIsFormOpen(true);
  };

  const saveDiary = (form) => {
    if (editingDiary) {
      setDiaries((current) =>
        current.map((diary) =>
          diary.diaryId === editingDiary.diaryId
            ? { ...form, diaryId: diary.diaryId }
            : diary,
        ),
      );
    } else {
      setDiaries((current) => [{ ...form, diaryId: Date.now() }, ...current]);
    }

    setIsFormOpen(false);
    setEditingDiary(null);
  };

  const deleteDiary = (diaryId) => {
    setDiaries((current) =>
      current.filter((diary) => diary.diaryId !== diaryId),
    );
    setSelectedDiary(null);
  };

  return (
    <main className="diary-page">
      <div className="diary-container">
        <header className="diary-header">
          <div>
            <p>Escape log</p>
            <h1>나의 방탈출 기록</h1>
            <span>잊고 싶지 않은 탈출의 순간을 모아보세요.</span>
          </div>
          <button
            type="button"
            className="diary-icon-button diary-header__more"
            aria-label="더보기"
          >
            <Icon name="more" />
          </button>
        </header>

        <section className="diary-summary" aria-label="기록 요약">
          <div>
            <small>총 기록</small>
            <strong>
              {diaries.length}
              <i>개</i>
            </strong>
          </div>
          <div>
            <small>평균 평점</small>
            <strong>
              <Icon name="star" className="diary-summary__star" />
              {averageScore}
            </strong>
          </div>
        </section>

        <div className="diary-list__heading">
          <h2>모든 기록</h2>
          <span>최근 기록순</span>
        </div>

        <section className="diary-list" aria-live="polite">
          {diaries.length ? (
            diaries.map((diary) => (
              <DiaryCard
                key={diary.diaryId}
                diary={diary}
                onClick={setSelectedDiary}
              />
            ))
          ) : (
            <div className="diary-empty">
              <span>
                <Icon name="archive" />
              </span>
              <strong>아직 기록이 없어요</strong>
              <p>첫 번째 방탈출의 기억을 남겨보세요.</p>
            </div>
          )}
        </section>
      </div>

      <button
        type="button"
        className="diary-fab"
        onClick={openCreateForm}
        aria-label="새 기록 작성"
      >
        <Icon name="plus" />
      </button>

      {selectedDiary && (
        <DiaryDetail
          diary={selectedDiary}
          onClose={() => setSelectedDiary(null)}
          onEdit={openEditForm}
          onDelete={deleteDiary}
        />
      )}

      {isFormOpen && (
        <DiaryForm
          diary={editingDiary}
          onClose={() => setIsFormOpen(false)}
          onSubmit={saveDiary}
        />
      )}
    </main>
  );
}
