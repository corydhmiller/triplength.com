import { render, screen, fireEvent } from '@testing-library/react';
import SavedTimezones from '../src/components/SavedTimezones';
import { SavedTimezone } from '../src/hooks/useSavedTimezones';

describe('SavedTimezones', () => {
  const mockTimezones: SavedTimezone[] = [
    { id: 'America/New_York', city: 'New York', abbr: 'EST' },
    { id: 'Europe/London', city: 'London', abbr: 'GMT' },
    { id: 'Asia/Tokyo', city: 'Tokyo', abbr: 'JST' },
  ];

  test('returns null when timezones array is empty', () => {
    const { container } = render(
      <SavedTimezones timezones={[]} onSelect={() => {}} onClearAll={() => {}} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('renders all saved timezones', () => {
    render(
      <SavedTimezones 
        timezones={mockTimezones} 
        onSelect={() => {}} 
        onClearAll={() => {}} 
      />
    );
    
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
  });

  test('displays timezone abbreviations', () => {
    render(
      <SavedTimezones 
        timezones={mockTimezones} 
        onSelect={() => {}} 
        onClearAll={() => {}} 
      />
    );
    
    expect(screen.getByText('(EST)')).toBeInTheDocument();
    expect(screen.getByText('(GMT)')).toBeInTheDocument();
    expect(screen.getByText('(JST)')).toBeInTheDocument();
  });

  test('calls onSelect when a timezone button is clicked', () => {
    const handleSelect = jest.fn();
    render(
      <SavedTimezones 
        timezones={mockTimezones} 
        onSelect={handleSelect} 
        onClearAll={() => {}} 
      />
    );
    
    const newYorkButton = screen.getByText('New York').closest('button');
    fireEvent.click(newYorkButton!);
    
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(mockTimezones[0]);
  });

  test('calls onClearAll when clear button is clicked', () => {
    const handleClearAll = jest.fn();
    render(
      <SavedTimezones 
        timezones={mockTimezones} 
        onSelect={() => {}} 
        onClearAll={handleClearAll} 
      />
    );
    
    const clearButton = screen.getByText('Clear all');
    fireEvent.click(clearButton);
    
    expect(handleClearAll).toHaveBeenCalledTimes(1);
  });

  test('renders "Recent" label', () => {
    render(
      <SavedTimezones 
        timezones={mockTimezones} 
        onSelect={() => {}} 
        onClearAll={() => {}} 
      />
    );
    
    expect(screen.getByText('Recent')).toBeInTheDocument();
  });

  test('each timezone button has correct title attribute', () => {
    render(
      <SavedTimezones 
        timezones={mockTimezones} 
        onSelect={() => {}} 
        onClearAll={() => {}} 
      />
    );
    
    const newYorkButton = screen.getByTitle('Select New York (EST)');
    expect(newYorkButton).toBeInTheDocument();
  });

  test('clear button has correct title attribute', () => {
    render(
      <SavedTimezones 
        timezones={mockTimezones} 
        onSelect={() => {}} 
        onClearAll={() => {}} 
      />
    );
    
    const clearButton = screen.getByTitle('Clear all recent timezones');
    expect(clearButton).toBeInTheDocument();
  });

  test('handles single timezone', () => {
    const singleTimezone: SavedTimezone[] = [
      { id: 'America/New_York', city: 'New York', abbr: 'EST' },
    ];
    
    render(
      <SavedTimezones 
        timezones={singleTimezone} 
        onSelect={() => {}} 
        onClearAll={() => {}} 
      />
    );
    
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.queryByText('London')).not.toBeInTheDocument();
  });
});
