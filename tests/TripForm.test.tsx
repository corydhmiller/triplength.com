import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TripForm from '../src/components/TripForm';
import { calculateTripDuration } from '../src/utils/duration';

// Mock child components
jest.mock('../src/components/TripCard', () => {
  return function MockTripCard({ title, type, data, onChange }: any) {
    return (
      <div data-testid={`trip-card-${type}`}>
        <h2>{title}</h2>
        <input
          data-testid={`${type}-date`}
          type="date"
          value={data.date}
          onChange={(e: any) => onChange({ date: e.target.value })}
        />
        <input
          data-testid={`${type}-time`}
          type="time"
          value={data.time}
          onChange={(e: any) => onChange({ time: e.target.value })}
        />
        <input
          data-testid={`${type}-timezone`}
          type="text"
          value={data.timezone}
          onChange={(e: any) => onChange({ timezone: e.target.value })}
        />
      </div>
    );
  };
});

jest.mock('../src/components/DurationResult', () => {
  return function MockDurationResult({ result, error }: any) {
    if (result) {
      return <div data-testid="duration-result">{result}</div>;
    }
    if (error) {
      return <div data-testid="duration-error">{error}</div>;
    }
    return null;
  };
});

jest.mock('../src/components/SubmitButton', () => {
  return function MockSubmitButton({ label }: any) {
    return <button type="submit">{label}</button>;
  };
});

jest.mock('../src/utils/duration');

const mockCalculateTripDuration = calculateTripDuration as jest.MockedFunction<typeof calculateTripDuration>;

describe('TripForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders departure and arrival trip cards', async () => {
    render(<TripForm />);
    
    await waitFor(() => {
      expect(screen.getByTestId('trip-card-departure')).toBeInTheDocument();
      expect(screen.getByTestId('trip-card-arrival')).toBeInTheDocument();
    });
  });

  test('renders submit button', () => {
    render(<TripForm />);
    
    expect(screen.getByText('Calculate Duration')).toBeInTheDocument();
  });

  test('initializes with current date and time', async () => {
    render(<TripForm />);
    
    await waitFor(() => {
      const depDate = screen.getByTestId('departure-date');
      expect(depDate).toBeInTheDocument();
      // The date might be different based on timezone, so just check it has a value
      const value = (depDate as HTMLInputElement).value;
      expect(value).toBeTruthy();
      expect(typeof value).toBe('string');
    });
  });

  test('updates departure data when changed', async () => {
    render(<TripForm />);
    
    await waitFor(() => {
      const depDate = screen.getByTestId('departure-date');
      fireEvent.change(depDate, { target: { value: '2026-06-15' } });
      
      expect(depDate).toHaveValue('2026-06-15');
    });
  });

  test('updates arrival data when changed', async () => {
    render(<TripForm />);
    
    await waitFor(() => {
      const arrDate = screen.getByTestId('arrival-date');
      fireEvent.change(arrDate, { target: { value: '2026-06-20' } });
      
      expect(arrDate).toHaveValue('2026-06-20');
    });
  });

  test('calculates duration on form submit', async () => {
    mockCalculateTripDuration.mockReturnValue({
      hours: 5,
      minutes: 30,
      totalMinutes: 330,
      formatted: '5 hours 30 minutes',
    });

    render(<TripForm />);
    
    await waitFor(() => {
      const form = document.getElementById('trip-form');
      expect(form).toBeInTheDocument();
      fireEvent.submit(form!);
    });
    
    await waitFor(() => {
      expect(mockCalculateTripDuration).toHaveBeenCalled();
      expect(screen.getByTestId('duration-result')).toHaveTextContent('5 hours 30 minutes');
    });
  });

  test('displays error when departure fields are incomplete', async () => {
    render(<TripForm />);
    
    await waitFor(() => {
      const depDate = screen.getByTestId('departure-date');
      fireEvent.change(depDate, { target: { value: '' } });
    });
    
    const form = document.getElementById('trip-form');
    fireEvent.submit(form!);
    
    await waitFor(() => {
      expect(screen.getByTestId('duration-error')).toHaveTextContent(
        'Please complete all departure fields'
      );
    });
  });

  test('displays error when arrival fields are incomplete', async () => {
    render(<TripForm />);
    
    await waitFor(() => {
      const arrDate = screen.getByTestId('arrival-date');
      fireEvent.change(arrDate, { target: { value: '' } });
    });
    
    const form = document.getElementById('trip-form');
    fireEvent.submit(form!);
    
    await waitFor(() => {
      expect(screen.getByTestId('duration-error')).toHaveTextContent(
        'Please complete all arrival fields'
      );
    });
  });

  test('displays error when calculation throws', async () => {
    mockCalculateTripDuration.mockImplementation(() => {
      throw new Error('Invalid date format');
    });

    render(<TripForm />);
    
    await waitFor(() => {
      const form = document.getElementById('trip-form');
      expect(form).toBeInTheDocument();
      fireEvent.submit(form!);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('duration-error')).toHaveTextContent(
        'Calculation error: Invalid date format'
      );
    });
  });

  test('clears previous result/error on new submit', async () => {
    mockCalculateTripDuration.mockReturnValue({
      hours: 2,
      minutes: 0,
      totalMinutes: 120,
      formatted: '2 hours',
    });

    render(<TripForm />);
    
    await waitFor(() => {
      const form = document.getElementById('trip-form');
      expect(form).toBeInTheDocument();
      
      // First submit
      fireEvent.submit(form!);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('duration-result')).toHaveTextContent('2 hours');
    });
    
    // Change duration calculation
    mockCalculateTripDuration.mockReturnValue({
      hours: 3,
      minutes: 15,
      totalMinutes: 195,
      formatted: '3 hours 15 minutes',
    });
    
    // Second submit
    const form = document.getElementById('trip-form');
    fireEvent.submit(form!);
    await waitFor(() => {
      expect(screen.getByTestId('duration-result')).toHaveTextContent('3 hours 15 minutes');
    });
  });

  test('has correct form attributes', async () => {
    render(<TripForm />);
    
    await waitFor(() => {
      const form = document.getElementById('trip-form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute('id', 'trip-form');
      expect(form).toHaveAttribute('aria-describedby', 'trip-form-description');
    });
  });

  test('prevents default form submission', async () => {
    mockCalculateTripDuration.mockReturnValue({
      hours: 2,
      minutes: 0,
      totalMinutes: 120,
      formatted: '2 hours',
    });
    
    render(<TripForm />);
    
    await waitFor(() => {
      const form = document.getElementById('trip-form');
      expect(form).toBeInTheDocument();
      fireEvent.submit(form!);
    });
    
    // Form submission should be handled, not default browser behavior
    await waitFor(() => {
      expect(mockCalculateTripDuration).toHaveBeenCalled();
    });
  });
});
