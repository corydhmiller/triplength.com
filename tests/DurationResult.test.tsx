import { render, screen } from '@testing-library/react';
import DurationResult from '../src/components/DurationResult';

describe('DurationResult', () => {
  test('returns null when both result and error are null', () => {
    const { container } = render(<DurationResult result={null} error={null} />);
    
    expect(container.firstChild).toBeNull();
  });

  test('renders result when provided', () => {
    render(<DurationResult result="5 hours 30 minutes" error={null} />);
    
    expect(screen.getByText('Total trip duration')).toBeInTheDocument();
    expect(screen.getByText('5 hours 30 minutes')).toBeInTheDocument();
  });

  test('renders error when provided', () => {
    render(<DurationResult result={null} error="Invalid date format" />);
    
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Invalid date format')).toBeInTheDocument();
  });

  test('has correct role for result', () => {
    render(<DurationResult result="2 hours" error={null} />);
    
    const resultDiv = screen.getByRole('status');
    expect(resultDiv).toBeInTheDocument();
    expect(resultDiv).toHaveAttribute('aria-live', 'polite');
    expect(resultDiv).toHaveAttribute('aria-atomic', 'true');
  });

  test('has correct role for error', () => {
    render(<DurationResult result={null} error="Error message" />);
    
    const errorDiv = screen.getByRole('alert');
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv).toHaveAttribute('aria-live', 'polite');
    expect(errorDiv).toHaveAttribute('aria-atomic', 'true');
  });

  test('applies error styling when error is present', () => {
    render(<DurationResult result={null} error="Test error" />);
    
    const errorText = screen.getByText('Test error');
    expect(errorText).toHaveClass('text-red-600');
  });

  test('applies success styling when result is present', () => {
    render(<DurationResult result="1 hour" error={null} />);
    
    const resultText = screen.getByText('1 hour');
    expect(resultText).toHaveClass('text-primary-black');
  });

  test('has correct id for duration text', () => {
    render(<DurationResult result="3 hours" error={null} />);
    
    const durationText = screen.getByText('3 hours');
    expect(durationText).toHaveAttribute('id', 'duration-text');
  });

  test('shows result when both result and error are provided', () => {
    // The component uses `result || error` for text, but `isError = Boolean(error)` for styling
    // So when both are provided: shows "Error" heading but result text
    render(<DurationResult result="5 hours" error="Error occurred" />);
    
    // When error exists, isError is true, so it shows "Error" heading
    expect(screen.getByText('Error')).toBeInTheDocument();
    // But the text shows result because of `result || error`
    expect(screen.getByText('5 hours')).toBeInTheDocument();
    expect(screen.queryByText('Total trip duration')).not.toBeInTheDocument();
  });
});
