import type { Filter } from '../types/todo'

const LABELS: Record<Filter, string> = { all: '전체', active: '진행중', done: '완료' }

interface Props {
  filter: Filter
  onChange: (filter: Filter) => void
}

export default function TodoFilter({ filter, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {(Object.keys(LABELS) as Filter[]).map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`rounded px-3 py-1 text-sm ${
            filter === f ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {LABELS[f]}
        </button>
      ))}
    </div>
  )
}
