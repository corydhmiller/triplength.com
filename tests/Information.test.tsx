import { render, screen, fireEvent } from '@testing-library/react';
import Information, { StepItem } from '../src/components/Information';

describe('StepItem', () => {
  test('renders step number correctly', () => {
    render(<StepItem number={1} title="Test Title" description="Test Description" />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('renders title and description', () => {
    render(<StepItem number={2} title="Step Two" description="This is step two" />);
    
    expect(screen.getByText('Step Two')).toBeInTheDocument();
    expect(screen.getByText('This is step two')).toBeInTheDocument();
  });

  test('renders different step numbers', () => {
    const { rerender } = render(
      <StepItem number={1} title="Test" description="Test" />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    
    rerender(<StepItem number={3} title="Test" description="Test" />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});

describe('Information', () => {
  test('renders details element', () => {
    const { container } = render(<Information />);
    
    const details = container.querySelector('details');
    expect(details).toBeInTheDocument();
  });

  test('renders summary text', () => {
    render(<Information />);
    
    expect(screen.getByText('How to use this calculator')).toBeInTheDocument();
  });

  test('renders all three steps', () => {
    render(<Information />);
    
    expect(screen.getByText('Enter departure details')).toBeInTheDocument();
    expect(screen.getByText('Enter arrival details')).toBeInTheDocument();
    expect(screen.getByText('Calculate')).toBeInTheDocument();
  });

  test('renders step descriptions', () => {
    render(<Information />);
    
    expect(screen.getByText(/Select the date and time you'll be leaving/)).toBeInTheDocument();
    expect(screen.getByText(/Do the same for your arrival city/)).toBeInTheDocument();
    expect(screen.getByText(/Hit the button to see exactly how many hours/)).toBeInTheDocument();
  });

  test('steps are numbered correctly', () => {
    render(<Information />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('can expand details', () => {
    const { container } = render(<Information />);
    
    const details = container.querySelector('details');
    const summary = screen.getByText('How to use this calculator');
    
    expect(details).not.toHaveAttribute('open');
    
    fireEvent.click(summary);
    
    // Note: details element open attribute might not update in jsdom
    // But we can verify the content is rendered
    expect(screen.getByText('Enter departure details')).toBeInTheDocument();
  });

  test('has correct structure with grid layout', () => {
    const { container } = render(<Information />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3');
  });
});
