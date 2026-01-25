import { render, screen, fireEvent } from '@testing-library/react';
import NowButton from '../src/components/NowButton';

describe('NowButton', () => {
  test('renders button with correct text', () => {
    render(<NowButton onClick={() => {}} />);
    
    expect(screen.getByText('Set to Now')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<NowButton onClick={handleClick} />);
    
    const button = screen.getByText('Set to Now');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has correct button type', () => {
    render(<NowButton onClick={() => {}} />);
    
    const button = screen.getByText('Set to Now');
    expect(button).toHaveAttribute('type', 'button');
  });

  test('has correct CSS classes', () => {
    render(<NowButton onClick={() => {}} />);
    
    const button = screen.getByText('Set to Now');
    expect(button).toHaveClass('text-[0.7rem]', 'px-[0.5rem]', 'py-[0.2rem]');
  });

  test('handles multiple clicks', () => {
    const handleClick = jest.fn();
    render(<NowButton onClick={handleClick} />);
    
    const button = screen.getByText('Set to Now');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(3);
  });
});
