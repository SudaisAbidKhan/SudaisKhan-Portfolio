import { ProjectCard } from './ProjectCard';

/**
 * ProjectGrid
 * Responsive grid layout that renders ProjectCard components.
 *
 * Props:
 *   projects   — filtered array of project objects
 *   cardVariant — 'default' | 'featured' | 'compact'  (passed to each ProjectCard)
 *   columns    — 'auto' | 2 | 3 | 4  (default 'auto' — fills based on minWidth)
 *   minCardWidth — min width per card in auto mode (default '300px')
 *   gap        — grid gap (default '1.5rem')
 *   emptyLabel — message shown when projects is empty
 */
export function ProjectGrid({
  projects     = [],
  cardVariant  = 'default',
  columns      = 'auto',
  minCardWidth = '300px',
  gap          = '1.5rem',
  emptyLabel   = 'No projects match your filter.',
}) {
  /* ── Empty state ── */
  if (!projects.length) {
    return (
      <div style={{
        textAlign: 'center', padding: '5rem 2rem',
        border: '1px dashed rgba(59,130,246,0.15)',
        borderRadius: '12px',
        background: 'rgba(15,32,68,0.2)',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
        <p style={{ fontSize: '1rem', color: '#64748B', marginBottom: '0.4rem' }}>
          {emptyLabel}
        </p>
        <p style={{ fontSize: '0.82rem', color: '#475569', fontFamily: 'var(--font-mono, monospace)' }}>
          Try a different filter or search term.
        </p>
      </div>
    );
  }

  /* ── Grid template ── */
  const gridTemplateColumns =
    columns === 'auto'
      ? `repeat(auto-fill, minmax(${minCardWidth}, 1fr))`
      : `repeat(${columns}, 1fr)`;

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns,
        gap,
        alignItems: 'stretch',
      }}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="reveal"
            style={{ animationDelay: `${(i % 3) * 100}ms` }}
          >
            <ProjectCard project={project} variant={cardVariant} />
          </div>
        ))}
      </div>

      {/* Result count */}
      <p style={{
        textAlign: 'center', marginTop: '2rem',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.72rem', color: '#475569',
      }}>
        Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
      </p>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 640px) {
          .project-grid-inner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

export default ProjectGrid;