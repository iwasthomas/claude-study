// 발행일 표기 통일: ISO 문자열의 날짜 부분(YYYY-MM-DD)만 사용해 결정적으로 포맷
// (타임존 변환을 하지 않으므로 서버/클라이언트 하이드레이션 불일치가 없음)
export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!match) return iso
  const [, year, month, day] = match
  return `${Number(year)}년 ${Number(month)}월 ${Number(day)}일`
}
