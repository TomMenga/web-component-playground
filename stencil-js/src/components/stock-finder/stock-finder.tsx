import { Component, Host, h, Prop, Watch, State, Event, EventEmitter } from '@stencil/core';

const AV_API_KEY = '21V6YNX664FKSS51';

@Component({
  tag: 'stock-finder',
  styleUrl: 'stock-finder.scss',
  shadow: true,
})
export class StockFinder {
  stockInputElement: HTMLInputElement;

  @State() searchResult: {symbol: string, name: string}[] = [];

  @Event({bubbles: false, composed: false}) searchCompleted: EventEmitter<{symbol: string, name: string}[]>;

  @Prop({mutable: true, reflect: true}) searchValue: string;

  @Watch('searchValue') 
  searchValueChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this._fetchStock(this.searchValue);
    }
  }

  render() {
    return (
      <Host class={{'conditional-class': true}}>
        <form onSubmit={this._onFormSubmit.bind(this)}>
          <input id="symbol-txt" type="text"
            ref={el => this.stockInputElement = el}/>
          <button type="submit">Search</button>
        </form>
        <ul>
          {this.searchResult.map(s => (
            <li><span>{s.symbol}</span> - {s.name}</li>
          ))}
        </ul>
      </Host>
    );
  }

  _onFormSubmit(event: Event) {
    event.preventDefault();
    this.searchValue = this.stockInputElement.value;
  }

  _fetchStock(stockSymbol: string) {
    this.stockInputElement.value = stockSymbol;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(res => this._onStockFetched(res))
      .catch(err => console.log(err));
  }

  _onStockFetched(res) {
    const stocks = res.bestMatches.map(s => ({symbol: s['1. symbol'], name: s['2. name']}));
    this.searchResult = stocks;
    this.searchCompleted.emit([...this.searchResult]);
  }

}
