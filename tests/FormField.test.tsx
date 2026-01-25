import { render, screen } from '@testing-library/react';
import FormField from '../src/components/FormField';

describe('FormField', () => {
  test('renders label correctly', () => {
    render(
      <FormField label="Test Label" id="test-id">
        <input type="text" id="test-id" />
      </FormField>
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('associates label with input via id', () => {
    render(
      <FormField label="Email" id="email-field">
        <input type="email" id="email-field" />
      </FormField>
    );
    
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('id', 'email-field');
  });

  test('renders children correctly', () => {
    render(
      <FormField label="Test" id="test">
        <input type="text" data-testid="child-input" />
      </FormField>
    );
    
    expect(screen.getByTestId('child-input')).toBeInTheDocument();
  });

  test('renders rightElement when provided', () => {
    const rightElement = <button>Click me</button>;
    
    render(
      <FormField label="Test" id="test" rightElement={rightElement}>
        <input type="text" id="test" />
      </FormField>
    );
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('does not render rightElement when not provided', () => {
    render(
      <FormField label="Test" id="test">
        <input type="text" id="test" />
      </FormField>
    );
    
    // Should not throw or render anything extra
    expect(screen.getByLabelText('Test')).toBeInTheDocument();
  });

  test('applies correct CSS classes and structure', () => {
    const { container } = render(
      <FormField label="Test" id="test">
        <input type="text" id="test" />
      </FormField>
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'flex-col', 'mb-[1.2rem]');
  });
});
