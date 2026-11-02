import { useTodoStore } from '../stores/todoStore'

/** 필터가 적용된 할일 목록과 남은 개수, 액션을 반환한다. */
export function useTodos() {
  const store = useTodoStore()
  const visible = store.todos.filter((t) =>
    store.filter === 'all' ? true : store.filter === 'done' ? t.done : !t.done,
  )
  const remaining = store.todos.filter((t) => !t.done).length
  return { ...store, visible, remaining }
}
