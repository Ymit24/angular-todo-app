export interface Todo {
  id: string,
  name: string,
  status?: 'complete' | 'active' | undefined,
}
