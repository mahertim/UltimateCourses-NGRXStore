export class Store {
  // private subscribers: Function[] = [];
  // private reducers: { [key: string]: Function } = {};
  private state: { [key: string]: any } = {};

  constructor(_reducers = {}, initialState = {}) {
    this.state = initialState;
  }

  get value() {
    return this.state;
  }

  dispatch(action: { type: string; payload: any }) {
    this.state = {
      ...this.state,
      todos: [...this.state.todos, action.payload],
    };
    console.log(this.state);
  }
}
