import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders left navigation menu', () => {
  render(<App />);
  expect(screen.getByTestId('title')).toHaveTextContent('WayFair');
  expect(screen.getByTestId('logo')).toHaveTextContent('LOGO');
  expect(screen.getByText('Reporting')).toBeInTheDocument()
  expect(screen.getByText('Tickets')).toBeInTheDocument()
  expect(screen.getByText('Orders')).toBeInTheDocument()
  expect(screen.getByText('CastleGate')).toBeInTheDocument()
  expect(screen.getByText('Inventory')).toBeInTheDocument()
  expect(screen.getByText('Products')).toBeInTheDocument()
  expect(screen.getByText('Premium Shelf')).toBeInTheDocument()
  expect(screen.getByText('Account Management')).toBeInTheDocument()
  expect(screen.getByText('Download Center')).toBeInTheDocument()
  expect(screen.getByText('Help & Support')).toBeInTheDocument()
});

test('expand collapse left navigation menu', () => {
  render(<App />);
  const button =  screen.getByTestId('sidebar-icon')
  fireEvent.click(button)
  const toggle = screen.getByTestId('sidebar-toggle')
  expect(toggle.className).toBe('Sidebar collapsed')
  fireEvent.click(button)
  expect(toggle.className).toBe('Sidebar')
});

test('dropdown menu in header', () => {
  render(<App />);
  const dropdown = screen.getByTestId('dropdown');
  fireEvent.click(dropdown);
  expect(screen.getByText('Account Settings')).toBeInTheDocument();
  expect(screen.getByText('User Management')).toBeInTheDocument();
  expect(screen.getByText('My Team')).toBeInTheDocument();
  expect(screen.getByText('English(UK)')).toBeInTheDocument();
  expect(screen.getByText('Logout')).toBeInTheDocument();
})

test('expand collapse dropdown', () => {
  render(<App />);
  const dropdown = screen.getByTestId('dropdown');
  fireEvent.click(dropdown)
  expect(dropdown.className).toBe('hide-dropdown')
})