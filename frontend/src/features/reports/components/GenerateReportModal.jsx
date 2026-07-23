import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import SegmentedControl from '../../../components/ui/SegmentedControl';
import Button from '../../../components/ui/Button';
import { DATE_RANGE_OPTIONS, REPORT_SECTION_OPTIONS } from '../api';
import './GenerateReportModal.css';

/**
 * GenerateReportModal
 * Reports-only: scope configuration for a new report (date range + which
 * sections to include). Submits via the parent's `onGenerate` handler.
 */
export default function GenerateReportModal({ open, onClose, onGenerate, isGenerating }) {
  const [dateRange, setDateRange] = useState('7d');
  const [sections, setSections] = useState(REPORT_SECTION_OPTIONS.map((s) => s.id));

  function toggleSection(id) {
    setSections((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  function handleSubmit() {
    onGenerate({ dateRange, sections });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Generate Report"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isGenerating}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={isGenerating} disabled={sections.length === 0}>
            Generate Report
          </Button>
        </>
      }
    >
      <div className="generate-report-modal__field">
        <span className="text-h3-label">Date Range</span>
        <SegmentedControl options={DATE_RANGE_OPTIONS} value={dateRange} onChange={setDateRange} />
      </div>

      <div className="generate-report-modal__field">
        <span className="text-h3-label">Include Sections</span>
        <div className="generate-report-modal__sections">
          {REPORT_SECTION_OPTIONS.map((section) => (
            <label key={section.id} className="generate-report-modal__checkbox-row">
              <input
                type="checkbox"
                checked={sections.includes(section.id)}
                onChange={() => toggleSection(section.id)}
              />
              <span className="text-body-sm">{section.label}</span>
            </label>
          ))}
        </div>
      </div>
    </Modal>
  );
}
