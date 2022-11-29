export enum ProjectLanguage {
  react = "react",
  node = "node",
  python = "python",
}

export enum ProjectStatus {
  info = "stable",
  warning = "warning",
  error = "critical",
}

export type ProjectStatusText = keyof typeof ProjectStatus;

export type Project = {
  id: string;
  name: string;
  language: ProjectLanguage;
  numIssues: number;
  numEvents24h: number;
  status: ProjectStatusText;
};
