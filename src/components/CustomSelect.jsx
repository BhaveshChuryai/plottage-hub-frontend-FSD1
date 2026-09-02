import { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * CustomSelect — fully accessible, robust dropdown component
 *
 * Uses container-relative positioning (`position: absolute; top: calc(100% + 8px); left: 0; width: 100%`)
 * so the option list is always anchored directly underneath its trigger element, with zero detached floating.
 *
 * Props:
 *   icon        — Lucide icon component (optional)
 *   label       — uppercase eyebrow label (e.g. "Budget", optional)
 *   placeholder — placeholder text when no option is selected
 *   value       — controlled value string
 *   onChange    — (value: string) => void
 *   options     — string[]
 *   compact     — boolean, smaller padding for sidebar/sorting controls
 *   className   — optional wrapper CSS class
 */
export default function CustomSelect({
  icon: Icon,
  label,
  placeholder = 'Select...',
  value,
  onChange,
  options = [],
  compact = false,
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const uid = useId();
  const listId = `cs-list-${uid}`;

  const hasValue = !!value && value !== 'All';

  // Toggle open
  const toggleDropdown = () => {
    if (!open) {
      setOpen(true);
      setFocusedIdx(options.indexOf(value));
    } else {
      setOpen(false);
      setFocusedIdx(-1);
    }
  };

  const closeDropdown = () => {
    setOpen(false);
    setFocusedIdx(-1);
    triggerRef.current?.focus();
  };

  const selectOption = (opt) => {
    onChange(opt === value && opt !== 'All' ? 'All' : opt);
    setOpen(false);
    setFocusedIdx(-1);
    triggerRef.current?.focus();
  };

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setFocusedIdx(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
        setFocusedIdx(options.indexOf(value) >= 0 ? options.indexOf(value) : 0);
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
        setFocusedIdx((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIdx((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIdx >= 0 && focusedIdx < options.length) {
          selectOption(options[focusedIdx]);
        }
        break;
      case 'Tab':
        setOpen(false);
        setFocusedIdx(-1);
        break;
      default:
        break;
    }
  };

  // Scroll focused option into view
  useEffect(() => {
    if (!open || focusedIdx < 0 || !listRef.current) return;
    const item = listRef.current.children[focusedIdx];
    item?.scrollIntoView({ block: 'nearest' });
  }, [focusedIdx, open]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ zIndex: open ? 50 : 1 }}
    >
      {/* ── Trigger element ── */}
      <div
        ref={triggerRef}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label || placeholder}
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center gap-3 transition-all duration-200 cursor-pointer select-none rounded-xl ${
          compact
            ? 'h-11 px-3.5 text-xs bg-[#141414] hover:bg-[#1a1a1a] border'
            : 'h-[60px] px-4 sm:px-4.5 text-sm bg-[#121212] hover:bg-[#181818] border-[1.5px]'
        } ${
          open
            ? 'border-[#C9A34A] shadow-[0_0_0_3px_rgba(201,163,74,0.15),0_4px_20px_rgba(0,0,0,0.6)]'
            : hasValue
            ? 'border-[rgba(201,163,74,0.45)]'
            : 'border-[rgba(201,163,74,0.22)] hover:border-[rgba(201,163,74,0.45)]'
        }`}
        style={{
          boxShadow: open
            ? '0 0 0 3px rgba(201,163,74,0.15), 0 4px 20px rgba(0,0,0,0.6)'
            : '0 2px 10px rgba(0,0,0,0.3)',
        }}
      >
        {/* Left Icon (if provided) */}
        {Icon && (
          <div
            className={`flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${
              open || hasValue ? 'text-[#E3C269]' : 'text-[#C9A34A]'
            }`}
          >
            <Icon size={compact ? 16 : 19} strokeWidth={1.75} />
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 min-w-0 text-left">
          {label && (
            <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#C9A34A] leading-none mb-1">
              {label}
            </p>
          )}
          <p
            className={`truncate font-medium ${
              compact ? 'text-xs' : 'text-sm'
            } ${hasValue ? 'text-[#F5F5F5]' : 'text-[#8A8A8A]'}`}
          >
            {hasValue ? value : placeholder}
          </p>
        </div>

        {/* Chevron */}
        <div
          className={`flex-shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180 text-[#E3C269]' : 'rotate-0 text-[#8A8A8A]'
          }`}
        >
          <ChevronDown size={compact ? 14 : 16} strokeWidth={2} />
        </div>
      </div>

      {/* ── Dropdown options list (anchored directly under trigger) ── */}
      {open && (
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label || placeholder}
          className="absolute top-[calc(100%+8px)] left-0 w-full z-50 bg-[#111111] border-[1.5px] border-[rgba(201,163,74,0.38)] rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(201,163,74,0.1)] max-h-[280px] overflow-y-auto py-1 animate-fade-in-down"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(201,163,74,0.35) transparent',
          }}
        >
          {options.map((opt, idx) => {
            const isSelected = opt === value;
            const isFocused = idx === focusedIdx;
            return (
              <div
                key={opt}
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(opt)}
                onMouseEnter={() => setFocusedIdx(idx)}
                className={`px-4 py-2.5 sm:py-3 text-sm cursor-pointer transition-colors duration-150 flex items-center justify-between gap-2 border-l-2 ${
                  isSelected
                    ? 'bg-[rgba(201,163,74,0.15)] text-[#E3C269] font-semibold border-[#C9A34A]'
                    : isFocused
                    ? 'bg-[rgba(255,255,255,0.06)] text-[#F5F5F5] font-normal border-transparent'
                    : 'text-[#C8C8C8] hover:text-[#F5F5F5] font-normal border-transparent'
                }`}
              >
                <span className="truncate">{opt}</span>
                {isSelected && (
                  <Check
                    size={14}
                    className="text-[#C9A34A] flex-shrink-0"
                    strokeWidth={2.5}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
