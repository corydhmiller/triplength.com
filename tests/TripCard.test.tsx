import { render, screen, fireEvent } from '@testing-library/react';
import { DateTime } from 'luxon';
import TripCard from '../src/components/TripCard';

// Mock the child components
jest.mock('../src/components/FormField', () => {
  return function MockFormField({ label, id, children, rightElement }: any) {
    return (
      <div data-testid={`form-field-${id}`}>
        <label htmlFor={id}>{label}</label>
        {rightElement}
        {children}
      </div>
    );
  };
});

jest.mock('../src/components/NowButton', () => {
  return function MockNowButton({ onClick }: any) {
    return <button onClick={onClick} data-testid="now-button">Set to Now</button>;
  };
});

jest.mock('../src/components/TimezoneSelect', () => {
  return function MockTimezoneSelect({ label, id, value, onChange }: any) {
    return (
      <div data-testid={`timezone-select-${id}`}>
        <label>{label}</label>
        <select
          data-testid={`timezone-${id}`}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        >
          <option value="">Select timezone</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Europe/London">Europe/London</option>
        </select>
      </div>
    );
  };
});

describe('TripCard', () => {
  const mockData = {
    date: '2026-06-01',
    time: '10:00',
    timezone: 'America/New_York',
  };

  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders with correct title for departure', () => {
    render(
      <TripCard 
        title="Departure" 
        type="departure" 
        data={mockData} 
        onChange={mockOnChange} 
      />
    );
    
    expect(screen.getByText('Departure')).toBeInTheDocument();
  });

  test('renders with correct title for arrival', () => {
    render(
      <TripCard 
        title="Arrival" 
        type="arrival" 
        data={mockData} 
        onChange={mockOnChange} 
      />
    );
    
    expect(screen.getByText('Arrival')).toBeInTheDocument();
  });

  test('renders date input with correct value', () => {
    render(
      <TripCard 
        title="Departure" 
        type="departure" 
        data={mockData} 
        onChange={mockOnChange} 
      />
    );
    
    const dateInput = screen.getByLabelText(/departure date/i);
    expect(dateInput).toHaveValue('2026-06-01');
  });

  test('renders time input with correct value', () => {
    render(
      <TripCard 
        title="Departure" 
        type="departure" 
        data={mockData} 
        onChange={mockOnChange} 
      />
    );
    
    const timeInput = screen.getByLabelText(/departure time/i);
    expect(timeInput).toHaveValue('10:00');
  });

  test('calls onChange when date changes', () => {
    render(
      <TripCard 
        title="Departure" 
        type="departure" 
        data={mockData} 
        onChange={mockOnChange} 
      />
    );
    
    const dateInput = screen.getByLabelText(/departure date/i);
    fireEvent.change(dateInput, { target: { value: '2026-06-02' } });
    
    expect(mockOnChange).toHaveBeenCalledWith({ date: '2026-06-02' });
  });

  test('calls onChange when time changes', () => {
    render(
      <TripCard 
        title="Departure" 
        type="departure" 
        data={mockData} 
        onChange={mockOnChange} 
      />
    );
    
    const timeInput = screen.getByLabelText(/departure time/i);
    fireEvent.change(timeInput, { target: { value: '14:30' } });
    
    expect(mockOnChange).toHaveBeenCalledWith({ time: '14:30' });
  });

  test('calls onChange when timezone changes', () => {
    render(
      <TripCard 
        title="Departure" 
        type="departure" 
        data={mockData} 
        onChange={mockOnChange} 
      />
    );
    
    const timezoneSelect = screen.getByTestId('timezone-dep-zone');
    fireEvent.change(timezoneSelect, { target: { value: 'Europe/London' } });
    
    expect(mockOnChange).toHaveBeenCalledWith({ timezone: 'Europe/London' });
  });

  test('handles Set to Now button click', () => {
    // Mock DateTime.now to return a specific time
    // Note: The actual timezone conversion might affect the displayed time
    const mockNow = DateTime.fromObject({
      year: 2026,
      month: 6,
      day: 15,
      hour: 12,
      minute: 30,
    }).setZone('America/New_York');
    
    const nowSpy = jest.spyOn(DateTime, 'now').mockReturnValue(mockNow as any);

    render(
      <TripCard 
        title="Departure" 
        type="departure" 
        data={mockData} 
        onChange={mockOnChange} 
      />
    );
    
    const nowButton = screen.getByTestId('now-button');
    fireEvent.click(nowButton);
    
    // Verify onChange was called with the correct structure
    expect(mockOnChange).toHaveBeenCalled();
    const callArgs = mockOnChange.mock.calls[0][0];
    expect(callArgs.date).toBe('2026-06-15');
    // The time format should be HH:mm (24-hour format)
    expect(callArgs.time).toMatch(/^\d{2}:\d{2}$/);
    expect(callArgs.timezone).toBeTruthy();
    expect(typeof callArgs.timezone).toBe('string');
    
    nowSpy.mockRestore();
  });

  test('has correct aria attributes for departure', () => {
    render(
      <TripCard 
        title="Departure" 
        type="departure" 
        data={mockData} 
        onChange={mockOnChange} 
      />
    );
    
    const heading = screen.getByText('Departure');
    expect(heading).toHaveAttribute('id', 'dep-heading');
  });

  test('has correct aria attributes for arrival', () => {
    render(
      <TripCard 
        title="Arrival" 
        type="arrival" 
        data={mockData} 
        onChange={mockOnChange} 
      />
    );
    
    const heading = screen.getByText('Arrival');
    expect(heading).toHaveAttribute('id', 'arr-heading');
  });

  test('inputs are required', () => {
    render(
      <TripCard 
        title="Departure" 
        type="departure" 
        data={mockData} 
        onChange={mockOnChange} 
      />
    );
    
    const dateInput = screen.getByLabelText(/departure date/i);
    const timeInput = screen.getByLabelText(/departure time/i);
    
    expect(dateInput).toBeRequired();
    expect(timeInput).toBeRequired();
  });
});
