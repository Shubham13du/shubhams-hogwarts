import { PROJECTS } from '../../data/content';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  return (
    <div className="projects">
      {PROJECTS.projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}