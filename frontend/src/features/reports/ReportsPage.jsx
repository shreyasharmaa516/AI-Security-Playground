import { useCallback, useEffect, useState } from "react";
import { FileBarChart } from "lucide-react";
import Card from "../../components/ui/Card";
import Pagination from "../../components/ui/Pagination";
import EmptyState from "../../components/ui/EmptyState";
import ErrorBanner from "../../components/ui/ErrorBanner";
import RecentReportsTable from "./components/RecentReportsTable";
import ReportPreviewDrawer from "./components/ReportPreviewDrawer";
import { fetchRecentReports } from "./api";
import "./ReportsPage.css";

const REPORTS_PAGE_SIZE = 5;

function downloadReportFile(report) {
  window.open(`http://localhost:8000/report/${report.id}`, "_blank");
}

/**
 * ReportsPage
 * Owns two independent fetch lifecycles (overview stats/charts, and the
 * paginated recent reports list) plus the Generate Report and preview
 * flows. Each panel below reuses shared UI components (Card, Table,
 * Pagination, Modal, Drawer) rather than inventing page-specific chrome.
 */
export default function ReportsPage() {
  const [reportsPhase, setReportsPhase] = useState("loading");
  const [reports, setReports] = useState([]);
  const [reportsTotal, setReportsTotal] = useState(0);
  const [reportsError, setReportsError] = useState(null);
  const [page, setPage] = useState(1);
  const [previewReport, setPreviewReport] = useState(null);

  const REPORTS_PAGE_SIZE = 5;

  const loadReports = useCallback(() => {
    setReportsPhase("loading");
    setReportsError(null);

    fetchRecentReports()
      .then((res) => {
        setReports(res.reports);
        setReportsTotal(res.total);
        setReportsPhase("success");
      })
      .catch((err) => {
        setReportsError(err.message || "Failed to load reports.");
        setReportsPhase("error");
      });
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  function downloadReportFile(report) {
    window.open(`http://localhost:8000/report/${report.id}`, "_blank");
  }

  const paginatedReports = reports.slice(
    (page - 1) * REPORTS_PAGE_SIZE,
    page * REPORTS_PAGE_SIZE,
  );

  return (
    <div className="reports">
      <Card title="Recent Reports" padded={false}>
        {reportsPhase === "error" && (
          <ErrorBanner message={reportsError} onRetry={loadReports} />
        )}

        {reportsPhase === "loading" && (
          <div className="reports__loading-rows">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="reports__skeleton-row" />
            ))}
          </div>
        )}

        {reportsPhase === "success" && paginatedReports.length === 0 && (
          <EmptyState
            icon={FileBarChart}
            title="No reports yet"
            description="Run an analysis to generate reports."
          />
        )}

        {reportsPhase === "success" && paginatedReports.length > 0 && (
          <>
            <RecentReportsTable
              reports={paginatedReports}
              onView={setPreviewReport}
              onDownload={downloadReportFile}
            />

            <Pagination
              page={page}
              pageSize={REPORTS_PAGE_SIZE}
              total={reportsTotal}
              onPageChange={setPage}
            />
          </>
        )}
      </Card>

      <ReportPreviewDrawer
        report={previewReport}
        onClose={() => setPreviewReport(null)}
        onDownload={downloadReportFile}
      />
    </div>
  );
}
