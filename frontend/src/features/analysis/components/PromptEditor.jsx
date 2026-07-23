import { ScanSearch } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Textarea from '../../../components/ui/Textarea';
import CharacterCounter from '../../../components/ui/CharacterCounter';
import SegmentedControl from '../../../components/ui/SegmentedControl';
import Button from '../../../components/ui/Button';
import { CONTEXT_OPTIONS, PROMPT_MAX_LENGTH } from '../api';
import './PromptEditor.css';

/**
 * PromptEditor
 * Analysis-only: the scan input surface. Purely controlled by its parent
 * (AnalysisPage) — holds no state of its own.
 */
export default function PromptEditor({
  prompt,
  onPromptChange,
  context,
  onContextChange,
  onRun,
  onClear,
  isScanning,
}) {
  const isOverLimit = prompt.length > PROMPT_MAX_LENGTH;
  const isEmpty = prompt.trim().length === 0;

  return (
    <Card
      eyebrow="Scan Input"
      title="Prompt Input"
      action={<CharacterCounter current={prompt.length} max={PROMPT_MAX_LENGTH} />}
      className="prompt-editor"
    >
      <div className="prompt-editor__context-row">
        <span className="text-caption prompt-editor__context-label">Simulate as</span>
        <SegmentedControl options={CONTEXT_OPTIONS} value={context} onChange={onContextChange} />
      </div>

      <Textarea
        variant="mono"
        className="prompt-editor__textarea"
        placeholder="Paste or write the prompt you want to analyze for security risks…"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        disabled={isScanning}
        rows={14}
      />

      <div className="prompt-editor__footer">
        <Button variant="ghost" onClick={onClear} disabled={isScanning || isEmpty}>
          Clear
        </Button>
        <Button
          variant="primary"
          icon={ScanSearch}
          loading={isScanning}
          disabled={isEmpty || isOverLimit}
          onClick={onRun}
        >
          {isScanning ? 'Analyzing…' : 'Run Analysis'}
        </Button>
      </div>
    </Card>
  );
}
