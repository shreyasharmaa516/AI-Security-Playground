from io import BytesIO

from reportlab.lib.colors import HexColor
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph
from reportlab.platypus import SimpleDocTemplate
from reportlab.platypus import Spacer


def generate_report(stats: dict, history: list):

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    elements = []

    title = Paragraph(
        "<b>Sentra Security Report</b>",
        styles["Title"],
    )

    elements.append(title)
    elements.append(Spacer(1, 20))

    elements.append(
        Paragraph(
            f"Total Analyses: <b>{stats['totalAnalyses']}</b>",
            styles["BodyText"],
        )
    )

    elements.append(
        Paragraph(
            f"Critical Threats: <b>{stats['critical']}</b>",
            styles["BodyText"],
        )
    )

    elements.append(
        Paragraph(
            f"High Risk: <b>{stats['highRisk']}</b>",
            styles["BodyText"],
        )
    )

    elements.append(
        Paragraph(
            f"Safe Prompts: <b>{stats['safe']}</b>",
            styles["BodyText"],
        )
    )

    elements.append(Spacer(1, 25))

    elements.append(
        Paragraph(
            "<b>Top Risk Prompts</b>",
            styles["Heading2"],
        )
    )

    elements.append(Spacer(1, 12))

    for item in history[:5]:

        elements.append(
            Paragraph(
                f"""
                <font color="#2563eb">
                {item.prompt}
                </font><br/>

                Risk Score:
                <b>{item.risk_score}</b>

                |
                Severity:
                <font color="#dc2626">
                {item.severity}
                </font>
                """,
                styles["BodyText"],
            )
        )

        elements.append(Spacer(1, 12))

    doc.build(elements)

    buffer.seek(0)

    return buffer
