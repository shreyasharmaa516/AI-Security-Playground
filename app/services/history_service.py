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

    critical = len([a for a in analyses if a.severity == "Critical"])

    high = len([a for a in analyses if a.severity == "High"])

    safe = len([a for a in analyses if a.severity == "Low"])

    return {
        "totalAnalyses": total,
        "highRisk": high,
        "critical": critical,
        "safe": safe,
    }
