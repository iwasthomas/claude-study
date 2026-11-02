import { beforeEach, describe, expect, it } from 'vitest'
import { useTodoStore } from './todoStore'

describe('todoStore', () => {
  beforeEach(() => useTodoStore.setState({ todos: [], filter: 'all' }))

  it('빈 문자열은 추가하지 않는다', () => {
    useTodoStore.getState().addTodo('   ')
    expect(useTodoStore.getState().todos).toHaveLength(0)
  })

  it('추가, 토글, 완료 항목 삭제', () => {
    const { addTodo, toggleTodo, clearDone } = useTodoStore.getState()
    addTodo('공부')
    addTodo('운동')
    toggleTodo(useTodoStore.getState().todos[0].id)
    clearDone()
    expect(useTodoStore.getState().todos.map((t) => t.text)).toEqual(['운동'])
  })
})
