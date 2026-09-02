import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * CustomSelect — fully custom, accessible dropdown
 *
 * Props:
 *   icon        — Lucide icon component
 *   label       — small uppercase eyebrow label (e.g. "Budget")
 *   placeholder — shown when no value selected
 *   value       — controlled value string
 *   onChange    — (value: string) => void
 *   options     — string[]
 */
export default function CustomSelect({ icon: Icon, label, placeholder, value, onChange, options }) {
  const [open, setOpen]           = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const [dropPos, setDropPos]     = useState({ top: 0, left: 0, width: 0 });

  const triggerRef = useRef(null);
  const listRef    = useRef(null);
  const uid        = useId();
  const listId     = `cs-list-${uid}`;

  const hasValue = !!value;

  /* ── Compute dropdown position (fixed, escapes any stacking context) ── */
  const computePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setDropPos({
      top:   r.bottom + window.scrollY + 6,
      left:  r.left   + window.scrollX,
      width: r.width,
    });
  }, []);

  /* ── Open/close ── */
  const openDropdown = () => {
    computePosition();
    setOpen(true);
    setFocusedIdx(options.indexOf(value));
  };

  const closeDropdown = () => {
    setOpen(false);
    setFocusedIdx(-1);
    triggerRef.current?.focus();
  };

  const selectOption = (opt) => {
    onChange(opt === value ? '' : opt); // toggle-off if same
    closeDropdown();
  };

  /* ── Click outside ── */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        !triggerRef.current?.contains(e.target) &&
        !listRef.current?.contains(e.target)
      ) {
        setOpen(false);
        setFocusedIdx(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  /* ── Reposition on scroll / resize ── */
  useEffect(() => {
    if (!open) return;
    const update = () => computePosition();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open, computePosition]);

  /* ── Keyboard navigation ── */
  const handleKeyDown = (e) => {
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        openDropdown();
      }
      return;
    }
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        closeDropdown();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIdx((i) => Math.min(i + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIdx((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIdx >= 0) selectOption(options[focusedIdx]);
        break;
      case 'Tab':
        closeDropdown();
        break;
      default:
        break;
    }
  };

  /* ── Scroll focused option into view ── */
  useEffect(() => {
    if (!open || focusedIdx < 0 || !listRef.current) return;
    const item = listRef.current.children[focusedIdx];
    item?.scrollIntoView({ block: 'nearest' });
  }, [focusedIdx, open]);

  /* ── Field styles ── */
  const fieldStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    height: '60px',
    padding: '0 18px',
    borderRadius: '14px',
    border: open
      ? '1.5px solid rgba(201,163,74,0.75)'
      : '1.5px solid rgba(201,163,74,0.22)',
    backgroundColor: 'rgba(18,18,18,0.98)',
    boxShadow: open
      ? '0 0 0 3px rgba(201,163,74,0.12), 0 4px 20px rgba(0,0,0,0.5)'
      : '0 2px 12px rgba(0,0,0,0.4)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    width: '100%',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
  };

  return (
    <>
      {/* ── Trigger button ── */}
      <div
        ref={triggerRef}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label}
        tabIndex={0}
        style={fieldStyle}
        onClick={() => (open ? closeDropdown() : openDropdown())}
        onKeyDown={handleKeyDown}
      >
        {/* Icon */}
        <div style={{
          flexShrink: 0,
          width: '20px', height: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: open || hasValue ? '#E3C269' : '#C9A34A',
          transition: 'color 0.2s ease',
        }}>
          <Icon size={20} strokeWidth={1.75} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: '#C9A34A',
            marginBottom: '2px', lineHeight: 1,
          }}>
            {label}
          </p>
          <p style={{
            fontSize: '14px', fontWeight: 500,
            color: hasValue ? '#F5F5F5' : '#737373',
            lineHeight: 1.2, whiteSpace: 'nowrap',
            overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {hasValue ? value : placeholder}
          </p>
        </div>

        {/* Chevron */}
        <div style={{
          flexShrink: 0, color: open ? '#C9A34A' : '#737373',
          transition: 'transform 0.2s ease, color 0.2s ease',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <ChevronDown size={16} strokeWidth={2} />
        </div>
      </div>

      {/* ── Dropdown panel — rendered via portal-like fixed positioning ── */}
      {open && (
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          style={{
            position: 'fixed',
            top: `${dropPos.top}px`,
            left: `${dropPos.left}px`,
            width: `${dropPos.width}px`,
            zIndex: 9999,
            backgroundColor: '#111111',
            border: '1.5px solid rgba(201,163,74,0.35)',
            borderRadius: '14px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,163,74,0.08)',
            overflow: 'hidden',
            maxHeight: '280px',
            overflowY: 'auto',
            /* Entrance animation */
            animation: 'csDropIn 0.18s ease forwards',
          }}
        >
          {/* "Clear / None" option */}
          {value && (
            <div
              role="option"
              aria-selected={false}
              onClick={() => { onChange(''); closeDropdown(); }}
              style={{
                padding: '12px 18px',
                fontSize: '13px',
                color: '#737373',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(201,163,74,0.1)',
                transition: 'background 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201,163,74,0.06)';
                e.currentTarget.style.color = '#A3A3A3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#737373';
              }}
            >
              — Clear selection
            </div>
          )}

          {options.map((opt, idx) => {
            const isSelected = opt === value;
            const isFocused  = idx === focusedIdx;
            return (
              <div
                key={opt}
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(opt)}
                onMouseEnter={() => setFocusedIdx(idx)}
                style={{
                  padding: '13px 18px',
                  fontSize: '14px',
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? '#E3C269' : isFocused ? '#F5F5F5' : '#C8C8C8',
                  cursor: 'pointer',
                  backgroundColor: isSelected
                    ? 'rgba(201,163,74,0.12)'
                    : isFocused
                      ? 'rgba(255,255,255,0.05)'
                      : 'transparent',
                  borderLeft: isSelected ? '2px solid #C9A34A' : '2px solid transparent',
                  transition: 'background 0.12s ease, color 0.12s ease, border-color 0.12s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{opt}</span>
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Keyframe animation injected once */}
      <style>{`
        @keyframes csDropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        /* Custom scrollbar for dropdown */
        #${CSS.escape(listId)}::-webkit-scrollbar { width: 4px; }
        #${CSS.escape(listId)}::-webkit-scrollbar-track { background: transparent; }
        #${CSS.escape(listId)}::-webkit-scrollbar-thumb { background: rgba(201,163,74,0.3); border-radius: 2px; }
      `}</style>
    </>
  );
}
