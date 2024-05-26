export type TodoStatus = 'complete' | 'active' | undefined;
export interface Todo {
  id: string,
  name: string,
  status?: TodoStatus,
}
