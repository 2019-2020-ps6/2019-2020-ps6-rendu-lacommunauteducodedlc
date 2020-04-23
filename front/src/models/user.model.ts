export interface User {
  userName: string;
  id: number;
  settingsId: number;
  icon?: string;
}

export enum IconUser {
  "fa-user-circle",
  "fa-grin-alt",
  "fa-surprise",
  "fa-grin-wink",
  "fa-grin-tongue",
  "fa-grin-tongue-wink",
  "fa-grin",
  "fa-grin-hearts",
  "fa-grin-squint",
  "fa-grin-tears",
  "fa-grin-stars",
  "fa-laugh-beam"
}
