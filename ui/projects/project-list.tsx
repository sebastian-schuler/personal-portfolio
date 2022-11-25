import { Divider, Stack } from '@mantine/core';
import React from 'react'
import Project from '../../interfaces/project';
import ProjectPreview from './project-preview';

interface Props {
  projects: Project[]
}

const ProjectList = ({ projects }: Props) => {

  return (
    <section>
      <Stack spacing={'lg'}>
        {
          projects.map((project, i) => (
            <div key={i}>
              <ProjectPreview
                title={project.title}
                coverImage={project.coverImage}
                date={project.date}
                excerpt={project.excerpt || ''}
                slug={project.slug}
                tags={project.tags}
                locales={project.locales}
                isFeatured={project.featured}
              />
              {
                i < projects.length - 1 && <Divider mt={'lg'} />
              }
            </div>
          ))
        }
      </Stack>
    </section>
  )
}

export default ProjectList;