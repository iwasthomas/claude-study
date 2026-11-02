import type { Todo } from '../types/todo'

interface Props {
  todos: Todo[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export default function TodoList({ todos, onToggle, onRemove }: Props) {
  if (todos.length === 0) {
    return <p className="py-6 text-center text-gray-400">할일이 없습니다</p>
  }
  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((t) => (
        <li key={t.id} className="flex items-center gap-3 py-2">
          <input type="checkbox" checked={t.done} onChange={() => onToggle(t.id)} aria-label={t.text} />
          <span className={`flex-1 ${t.done ? 'text-gray-400 line-through' : ''}`}>{t.text}</span>
          <button onClick={() => onRemove(t.id)} className="text-sm text-red-500 hover:underline">
            삭제
          </button>
        </li>
      ))}
    </ul>
  )
}
