from sqlalchemy.orm import Session

from app.models.analysis import Analysis


def save_analysis(
    db: Session,
    prompt: str,
    risk_score: int,
    severity: str,
    message: str,
    detections=None,
    ai_confidence=None,
    analysis_engine="Rule Engine + Gemini AI",
):
    analysis = Analysis(
        prompt=prompt,
        risk_score=risk_score,
        severity=severity,
        message=message,
        detections=detections,
        ai_confidence=ai_confidence,
        analysis_engine=analysis_engine,
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return analysis


def get_all_analyses(db: Session):
    return db.query(Analysis).order_by(Analysis.created_at.desc()).all()


def get_dashboard_stats(db: Session):
    analyses = db.query(Analysis).all()

    total = len(analyses)

    critical = sum(1 for a in analyses if a.severity == "Critical")
    high = sum(1 for a in analyses if a.severity == "High")
    medium = sum(1 for a in analyses if a.severity == "Medium")
    low = sum(1 for a in analyses if a.severity == "Low")

    security_score = round(sum(a.risk_score for a in analyses) / total) if total else 0

    detection_rate = (
        round(((critical + high + medium) / total) * 100, 1) if total else 0
    )

    return {
        "security_score": security_score,
        "critical_threats": critical,
        "total_analyses": total,
        "detection_rate": detection_rate,
        "high": high,
        "medium": medium,
        "safe": low,
    }
