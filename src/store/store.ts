export class Store {
  // private subscribers: Function[] = [];
  private reducers: { [key: string]: Function } = {};
  private state: { [key: string]: any } = {};

  constructor(reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }

  dispatch(action: { type: string; payload: any }) {
    this.state = this.reduce(this.state, action);
  }

  private reduce(
    state: { [key: string]: any },
    action: { type?: string; payload?: any },
  ) {
    const newState: { [key: string]: any } = {};
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}
