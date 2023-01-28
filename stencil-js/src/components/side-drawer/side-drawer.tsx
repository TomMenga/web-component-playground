import { Component, h, Method, Prop } from "@stencil/core";

@Component({
  tag: 'lez-side-drawer',
  styleUrl: './side-drawer.scss',
  shadow: true,
})
export class SideDrawer {

  @Prop({ reflect: true }) panelTitle: string;
  @Prop({ reflect: true, mutable: true }) isOpen: boolean;

  @Method()
  async toggle() {
    this.isOpen
      ? this.close()
      : this.open();
  }

  @Method()
  async open() {
    this.isOpen = true;
  }

  @Method()
  async close() {
    this.isOpen = false;
  }

  // LifeCycle methods

  /** Called every redraw */
  render() {
    return ([
      this._renderBackdrop(),
      <aside>
        <header>
          <h1>{this.panelTitle}</h1>
        </header>
        <main>
          <button class="close-btn" onClick={this.toggle.bind(this)}></button>
          <slot />
        </main>
      </aside>
    ]);
  }

  _renderBackdrop() {
    return (
      <div class="backdrop" onClick={this.close.bind(this)} />
    );
  }
}