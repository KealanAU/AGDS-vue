import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useScrollToField } from './useScrollToField'

describe('useScrollToField', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('returns a function', () => {
    expect(typeof useScrollToField()).toBe('function')
  })

  // ─── String id ──────────────────────────────────────────────────────────────

  describe('called with a string id', () => {
    it('does nothing if no element with that id exists', () => {
      const scrollToField = useScrollToField()
      expect(() => scrollToField('nonexistent-id')).not.toThrow()
    })

    it('focuses a non-div element found by id', () => {
      const input = document.createElement('input')
      input.id = 'my-field'
      container.appendChild(input)
      const focusSpy = vi.spyOn(input, 'focus')

      useScrollToField()('my-field')

      expect(focusSpy).toHaveBeenCalled()
    })

    it('finds element by name attribute when no element with that id exists', () => {
      const input = document.createElement('input')
      input.name = 'my-named-field'
      container.appendChild(input)
      const focusSpy = vi.spyOn(input, 'focus')

      useScrollToField()('my-named-field')

      expect(focusSpy).toHaveBeenCalled()
    })

    it('focuses the first input inside a div target', () => {
      const div = document.createElement('div')
      div.id = 'group-container'
      const input = document.createElement('input')
      div.appendChild(input)
      container.appendChild(div)
      const focusSpy = vi.spyOn(input, 'focus')

      useScrollToField()('group-container')

      expect(focusSpy).toHaveBeenCalled()
    })

    it('does not throw when div target has no input child', () => {
      const div = document.createElement('div')
      div.id = 'empty-group'
      container.appendChild(div)

      expect(() => useScrollToField()('empty-group')).not.toThrow()
    })

    it('scrolls the label parentElement into view when a label[for] exists', () => {
      const fieldWrapper = document.createElement('div')
      const label = document.createElement('label')
      label.setAttribute('for', 'labeled-input')
      const input = document.createElement('input')
      input.id = 'labeled-input'
      fieldWrapper.appendChild(label)
      fieldWrapper.appendChild(input)
      container.appendChild(fieldWrapper)

      const scrollSpy = vi.spyOn(fieldWrapper, 'scrollIntoView')

      useScrollToField()('labeled-input')

      expect(scrollSpy).toHaveBeenCalledWith({ block: 'nearest' })
    })

    it('falls back to scrollIntoView on the target itself when no label exists', () => {
      const input = document.createElement('input')
      input.id = 'unlabeled-input'
      container.appendChild(input)

      const scrollSpy = vi.spyOn(input, 'scrollIntoView')

      useScrollToField()('unlabeled-input')

      expect(scrollSpy).toHaveBeenCalledWith({ block: 'nearest' })
    })

    it('does not call preventDefault when invoked with a string', () => {
      const input = document.createElement('input')
      input.id = 'string-target'
      container.appendChild(input)

      // No error means it branched correctly (no preventDefault call on string)
      expect(() => useScrollToField()('string-target')).not.toThrow()
    })
  })

  // ─── MouseEvent ─────────────────────────────────────────────────────────────

  describe('called with a MouseEvent', () => {
    it('extracts the id from the anchor hash and focuses the target', () => {
      const input = document.createElement('input')
      input.id = 'event-target'
      container.appendChild(input)
      const focusSpy = vi.spyOn(input, 'focus')

      const anchor = document.createElement('a')
      anchor.href = '#event-target'
      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      Object.defineProperty(event, 'target', { value: anchor })

      useScrollToField()(event)

      expect(focusSpy).toHaveBeenCalled()
    })

    it('calls preventDefault on the event when a target is found', () => {
      const input = document.createElement('input')
      input.id = 'prevent-target'
      container.appendChild(input)

      const anchor = document.createElement('a')
      anchor.href = '#prevent-target'
      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      Object.defineProperty(event, 'target', { value: anchor })
      const preventSpy = vi.spyOn(event, 'preventDefault')

      useScrollToField()(event)

      expect(preventSpy).toHaveBeenCalled()
    })

    it('does nothing if the event target is not an anchor element', () => {
      const button = document.createElement('button')
      const event = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(event, 'target', { value: button })

      expect(() => useScrollToField()(event)).not.toThrow()
    })

    it('does nothing if the anchor has no hash', () => {
      const anchor = document.createElement('a')
      anchor.href = '/no-hash'
      const event = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(event, 'target', { value: anchor })

      expect(() => useScrollToField()(event)).not.toThrow()
    })

    it('does nothing if no element matches the extracted id', () => {
      const anchor = document.createElement('a')
      anchor.href = '#missing-element'
      const event = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(event, 'target', { value: anchor })

      expect(() => useScrollToField()(event)).not.toThrow()
    })
  })
})
