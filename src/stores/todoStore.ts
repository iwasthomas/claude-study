import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Filter, Todo } from '../types/todo'

interface TodoState {
  todos: Todo[]
  filter: Filter
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
  clearDone: () => void
  setFilter: (filter: Filter) => void
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',
      addTodo: (text) => {
        const trimmed = text.trim()
        if (!trimmed) return
        set((s) => ({
          todos: [...s.todos, { id: crypto.randomUUID(), text: trimmed, done: false }],
        }))
      },
      toggleTodo: (id) =>
        set((s) => ({ todos: s.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })),
      removeTodo: (id) => set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),
      clearDone: () => set((s) => ({ todos: s.todos.filter((t) => !t.done) })),
      setFilter: (filter) => set({ filter }),
    }),
    { name: 'todos' },
  ),
)
