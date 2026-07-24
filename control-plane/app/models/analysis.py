from datetime import datetime

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy import JSON
from sqlalchemy import String

from app.database.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)

    prompt = Column(String, nullable=False)

    risk_score = Column(Integer, nullable=False)

    severity = Column(String, nullable=False)

    message = Column(String, nullable=False)

    detections = Column(JSON, nullable=True)

    ai_confidence = Column(Integer, nullable=True)

    analysis_engine = Column(String, default="Rule Engine + Gemini AI")

    created_at = Column(DateTime, default=datetime.now)
