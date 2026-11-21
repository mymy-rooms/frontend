import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="placeholder-page">
      <small>404</small>
      <h1>페이지를 찾을 수 없어요</h1>
      <Link className="text-link" to="/">
        홈으로 돌아가기
      </Link>
    </main>
  );
}
