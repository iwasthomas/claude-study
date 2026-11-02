import TodoFilter from './components/TodoFilter'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { useTodos } from './hooks/useTodos'

export default function App() {
  const { visible, remaining, filter, addTodo, toggleTodo, removeTodo, clearDone, setFilter } =
    useTodos()

  return (
    <main className="mx-auto mt-10 max-w-md space-y-4 rounded-lg bg-white p-6 shadow">
      <h1 className="text-2xl font-bold">할일 관리</h1>
      <TodoInput onAdd={addTodo} />
      <TodoFilter filter={filter} onChange={setFilter} />
      <TodoList todos={visible} onToggle={toggleTodo} onRemove={removeTodo} />
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>남은 할일 {remaining}개</span>
        <button onClick={clearDone} className="hover:underline">
          완료 항목 삭제
        </button>
      </div>
    </main>
  )
}
