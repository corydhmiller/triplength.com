import { render, screen } from '@testing-library/react';
import SubmitButton from '../src/components/SubmitButton';

describe('SubmitButton', () => {
  test('renders button with provided label', () => {
    render(<SubmitButton label="Submit Form" />);
    
    expect(screen.getByText('Submit Form')).toBeInTheDocument();
  });

  test('has correct button type', () => {
    render(<SubmitButton label="Calculate" />);
    
    const button = screen.getByText('Calculate');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('renders different labels correctly', () => {
    const { rerender } = render(<SubmitButton label="First Label" />);
    expect(screen.getByText('First Label')).toBeInTheDocument();
    
    rerender(<SubmitButton label="Second Label" />);
    expect(screen.getByText('Second Label')).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    render(<SubmitButton label="Test" />);
    
    const button = screen.getByText('Test');
    expect(button).toHaveClass('w-full', 'max-w-[400px]', 'mx-auto');
  });

  test('is accessible', () => {
    render(<SubmitButton label="Submit" />);
    
    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
  });
});
