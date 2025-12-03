import { useState, useEffect } from 'react';

const RankingSummaryCards = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("http://mockstock.duckdns.org/ranks/summary");
        if (!response.ok) throw new Error("API 요청 실패");

        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error("요약 정보를 불러올 수 없습니다:", error);
      }
    };

    fetchSummary();
  }, []);

  if (!summary) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="ranking-summary-cards">
      <div className="summary-card">
        <div className="card-title">총 참여자 수</div>
        <div className="card-value">{summary.totalMember}</div>
      </div>
      <div className="summary-card positive-rate">
        <div className="card-title">수익률 달성자 비율</div>
        <div className="card-value">{summary.plusRate}</div>
      </div>
      <div className="summary-card negative-rate">
        <div className="card-title">수익률 손실자 비율</div>
        <div className="card-value">{summary.minusRate}</div>
      </div>
      <div className="summary-card">
        <div className="card-title">파산 유저</div>
        <div className="card-value">{summary.bankruptcyMember}</div>
      </div>
    </div>
  );
};

export default RankingSummaryCards;
