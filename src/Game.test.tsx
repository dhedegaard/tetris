// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { GameWithStore } from './Game'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

const press = (key: string) => {
  fireEvent.keyDown(document, { key })
  fireEvent.keyUp(document, { key })
}

it('plays through the keyboard until game over, then restarts', async () => {
  const consoleError = vi.spyOn(console, 'error')
  render(<GameWithStore />)
  // Let the mount effect shuffle the queue and start the game.
  await act(async () => {})

  expect(screen.getByText('00000000')).toBeDefined()
  expect(screen.queryByText('Game over')).toBeNull()

  // Dropping every shape in the middle stacks them up to the top.
  for (let i = 0; i < 30 && screen.queryByText('Game over') == null; i++) {
    press(' ')
  }
  expect(screen.queryByText('Game over')).not.toBeNull()

  press('r')
  expect(screen.queryByText('Game over')).toBeNull()
  expect(screen.getByText('00000000')).toBeDefined()
  expect(consoleError).not.toHaveBeenCalled()
})
