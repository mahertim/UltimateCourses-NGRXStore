export class Store {
  private subscribers: Function[] = [];
  private reducers: { [key: string]: Function } = {};
  private state: { [key: string]: any } = {};

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }

  subscribe(fn: Function) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    return () => {
      // keep all subscribers that are not this function
      this.subscribers = this.subscribers.filter((sub) => sub !== fn);
    };
  }

  dispatch(action: { type: string; payload: any }) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify() {
    this.subscribers.forEach((fn) => fn(this.value));
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
