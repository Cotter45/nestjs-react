import sessionReducer, {
  SessionState,
  setUser,
  removeUser,
} from './sessionSlice';

describe('session reducer', () => {
  const initialState: SessionState = {
    user: undefined,
    status: 'idle',
  };

  it('should handle initial state', () => {
    expect(sessionReducer(undefined, { type: 'unknown' })).toEqual({
      user: undefined,
      status: 'idle',
    });
  });

  it('should handle setUser', () => {
    const user = { id: 1, name: 'test', email: 'test', createdAt: new Date(), updatedAt: new Date(), password: 'test' }
    const actual = sessionReducer(initialState, setUser(user));
    expect(actual.user).toEqual(user);
  });

  it('should handle removeUser', () => {
    const actual = sessionReducer(initialState, removeUser());
    expect(actual.user).toEqual(undefined);
  });
});