/**
 * FilterBar
 * Sticky filter bar with category chips and optional search input.
 *
 * Props:
 *   categories     — string[]  list of category labels (e.g. ['All', 'Full Stack', 'Frontend'])
 *   activeCategory — currently selected category string
 *   onCategory     — (cat: string) => void
 *   search         — current search string
 *   onSearch       — (val: string) => void
 *   resultCount    — number shown in result label
 *   sticky         — stick to top below navbar (default true)
 */
export function FilterBar({
  categories     = [],
  activeCategory = 'All',
  onCategory,
  search         = '',
  onSearch,
  resultCount,
  sticky         = true,
}) {
  const SearchIcon = () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
      viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );

  const ClearIcon = () => (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5"
      viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  return (
    <div style={{
      background: 'rgba(10,22,40,0.75)',
      backdropFilter: 'blur(20px)',
      borderTop:    '1px solid rgba(59,130,246,0.12)',
      borderBottom: '1px solid rgba(59,130,246,0.12)',
      padding: '0.9rem 0',
      position: sticky ? 'sticky' : 'relative',
      top: sticky ? '72px' : 'auto',
      zIndex: 100,
    }}>
      <div className="container">
        <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center', flexWrap: 'wrap' }}>

          {/* ── Category chips ── */}
          {categories.length > 0 && (
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Label */}
              <span style={{
                fontFamily: 'var(--font-mono, monospace)', fontSize: '0.65rem',
                color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em',
                marginRight: '0.2rem', whiteSpace: 'nowrap',
              }}>Filter:</span>

              {categories.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onCategory?.(cat)}
                    style={{
                      padding: '5px 13px', borderRadius: '8px', cursor: 'pointer',
                      border: isActive
                        ? '1px solid #3B82F6'
                        : '1px solid rgba(59,130,246,0.18)',
                      background: isActive
                        ? 'rgba(59,130,246,0.14)'
                        : 'transparent',
                      color: isActive ? '#60A5FA' : '#94A3B8',
                      fontFamily: 'var(--font-body, sans-serif)',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.8rem',
                      transition: 'all 0.18s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
                        e.currentTarget.style.color       = '#CBD5E1';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.18)';
                        e.currentTarget.style.color       = '#94A3B8';
                      }
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Divider ── */}
          {categories.length > 0 && onSearch && (
            <div style={{ width: 1, height: 20, background: 'rgba(59,130,246,0.15)', flexShrink: 0 }} />
          )}

          {/* ── Search input ── */}
          {onSearch && (
            <div style={{ position: 'relative', marginLeft: 'auto' }}>
              {/* Search icon */}
              <span style={{
                position: 'absolute', left: '10px', top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748B', display: 'flex', pointerEvents: 'none',
              }}>
                <SearchIcon />
              </span>

              <input
                type="text"
                placeholder="Search projects or tech…"
                value={search}
                onChange={e => onSearch(e.target.value)}
                style={{
                  paddingLeft: '32px',
                  paddingRight: search ? '32px' : '12px',
                  paddingTop: '6px', paddingBottom: '6px',
                  borderRadius: '8px',
                  border: '1px solid rgba(59,130,246,0.18)',
                  background: 'rgba(15,32,68,0.5)',
                  color: '#E2E8F0',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.8rem', outline: 'none',
                  width: '220px', transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#3B82F6';
                  e.target.style.boxShadow   = '0 0 0 3px rgba(59,130,246,0.12)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(59,130,246,0.18)';
                  e.target.style.boxShadow   = 'none';
                }}
              />

              {/* Clear button */}
              {search && (
                <button
                  onClick={() => onSearch('')}
                  style={{
                    position: 'absolute', right: '8px', top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex', alignItems: 'center',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#64748B', padding: '2px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#E2E8F0'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
                  aria-label="Clear search"
                >
                  <ClearIcon />
                </button>
              )}
            </div>
          )}

          {/* ── Result count ── */}
          {resultCount !== undefined && (
            <span style={{
              fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem',
              color: '#475569', whiteSpace: 'nowrap',
              marginLeft: onSearch ? '0' : 'auto',
            }}>
              {resultCount} result{resultCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .filter-search { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}

export default FilterBar;