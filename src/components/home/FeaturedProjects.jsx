import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import { ProjectCard } from '../projects/ProjectCard';

export function FeaturedProjects() {
  const featured = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section className="section" style={{ background: 'rgba(10,22,40,0.4)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="section-tag reveal">Featured Work</div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem',
          }}>
            <h2 className="section-title reveal">Projects I'm proud of</h2>
            <Link
              to="/projects"
              className="reveal"
              style={{
                color: '#60A5FA', fontSize: '0.875rem', fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                transition: 'gap 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.gap = '10px'}
              onMouseLeave={e => e.currentTarget.style.gap = '5px'}
            >
              View all projects →
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {featured.map((project, i) => (
            <div
              key={project.id}
              className="reveal"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <ProjectCard project={project} variant="featured" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
