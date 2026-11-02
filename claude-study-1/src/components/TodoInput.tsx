import { useState, type FormEvent } from 'react'

export default function TodoInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(text)
    setText('')
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할일을 입력하세요"
        className="flex-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        추가
      </button>
    </form>
  )
}
