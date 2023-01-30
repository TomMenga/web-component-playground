import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'lez-stock-price',
  styleUrl: 'stock-price.scss',
  shadow: true,
})
export class StockPrice {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
