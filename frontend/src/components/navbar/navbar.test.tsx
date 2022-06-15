import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import NavBar from './Navbar';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <NavBar />
    </Provider>,
  );

  expect(screen.getByText(/Nest Test/i)).toBeInTheDocument();
  expect(screen.getByTestId(/menu-toggle/i)).toBeInTheDocument();

  act(() => {
    screen.getByTestId(/menu-toggle/i).click();
  })

  expect(screen.getByTestId(/signup-button/i)).toBeInTheDocument();
  expect(screen.getByTestId(/login-button/i)).toBeInTheDocument();
  expect(screen.getByTestId(/articles-button/i)).toBeInTheDocument();
});
