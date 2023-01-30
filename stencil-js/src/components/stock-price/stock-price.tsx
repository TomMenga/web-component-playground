import { Component, Host, h, State, Element, Prop } from '@stencil/core';

const AV_API_KEY = '21V6YNX664FKSS51';

@Component({
  tag: 'lez-stock-price',
  styleUrl: 'stock-price.scss',
  shadow: true,
})
export class StockPrice {
  stockInputElement: HTMLInputElement;

  /** Retrieve the host element */
  @Element() hostElement: HTMLElement;

  @Prop() stockSymbol: string;

  @State() currentPrice: number;
  @State() stockSymbolInput: string;
  @State() stockInputIsValid: boolean;

  componentDidLoad() {
    if (this.stockSymbol) {
      this._fetchStockPrice(this.stockSymbol);
    }
  }

  render() {
    return (
      <Host>
        <form onSubmit={this._fetchStockPrice.bind(this)}>
          <input id="symbol-txt" type="text"
            ref={el => this.stockInputElement = el}
            value={this.stockSymbolInput}
            onInput={this._onStockSymbolInput.bind(this)}/>
          <button type="submit" disabled={!this.stockSymbolInput}>Fetch</button>
        </form>
        <div>
          <p>Price: {this.currentPrice} $</p>
        </div>
      </Host>
    );
  }

  _onStockSymbolInput(event: Event) {
    this.stockSymbolInput = (event.target as HTMLInputElement).value;

    this.stockInputIsValid = this.stockSymbolInput.trim() !== '';
  }

  _onFormSubmit(event: Event) {
    event.preventDefault();
    this._fetchStockPrice(this.stockInputElement.value);
  }

  _fetchStockPrice(stockSymbol: string) {

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(res => this._onStockPriceFetched(res))
      .catch(err => console.log(err));
  }

  _onStockPriceFetched(res) {
    console.log(res);
    this.currentPrice = +res['Global Quote']['05. price'];
  }
}
