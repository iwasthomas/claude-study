import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, expect, it } from 'vitest'
import App from './App'
import { useTodoStore } from './stores/todoStore'

beforeEach(() => useTodoStore.setState({ todos: [], filter: 'all' }))

it('할일을 추가하고 남은 개수를 표시한다', () => {
  render(<App />)
  fireEvent.change(screen.getByPlaceholderText('할일을 입력하세요'), { target: { value: '테스트' } })
  fireEvent.click(screen.getByText('추가'))
  expect(screen.getByText('테스트')).toBeInTheDocument()
  expect(screen.getByText('남은 할일 1개')).toBeInTheDocument()
})
