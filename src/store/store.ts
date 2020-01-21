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
}
