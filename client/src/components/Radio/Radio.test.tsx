import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Radio from './Radio'

const mockProps = {
  label: 'Radio label',
  value: 'value'
}

describe('Radio', () => {
  it('renders a label and a radio', () => {
    const { container, getByRole } = render(<Radio {...mockProps} />)
    getByRole('radio')
    expect(container.firstElementChild!.tagName).toBe('LABEL')
  })

  it('can be selected by clicking the label', () => {
    const onChangeSpy = jest.fn()
    const { container } = render(
      <Radio {...mockProps} onChange={onChangeSpy} />
    )
    const label = container.querySelector('label')

    fireEvent.click(label!)

    expect(onChangeSpy).toHaveBeenCalled()
  })
})
