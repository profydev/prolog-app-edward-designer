import styled from "styled-components";
import { color, breakpoint, space } from "@styles/theme";
import { ProjectCard } from "../project-card";
import { useProjects } from "../../api/use-projects";
import { Loading } from "../../../ui/loading";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: ${space(6)};

  // reset list styles
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: ${breakpoint("desktop")}) {
    grid-template-columns: repeat(auto-fit, 400px);
  }
`;

const Error = styled.div`
  display: flex;
  color: ${color("error", 700)};
  font-size: 0.875rem;
  line-height: 1.35em;
  border: 1px solid ${color("error", 300)};
  border-radius: 8px;
  background: url("/icons/alert-circle.svg") no-repeat ${color("error", 50)}
    15px center;
  margin: 0;
  padding: 16px 16px 16px 48px;
  @media (min-width: ${breakpoint("desktop")}) {
    margin-left: -8px;
    line-height: 1.2em;
  }
`;

const ErrorMsg = styled.div`
  flex: 1;
`;

const TryAgainButton = styled.button`
  border: 0;
  background: url("/icons/arrow-right.svg") no-repeat center right transparent;
  color: inherit;
  padding-right: 30px;
`;

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useProjects();

  const retry = () => refetch();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error(error);
    return (
      <Error>
        <ErrorMsg>There was a problem while loading the project data.</ErrorMsg>
        <TryAgainButton onClick={retry} type="button">
          Try again
        </TryAgainButton>
      </Error>
    );
  }

  return (
    <List>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </List>
  );
}
