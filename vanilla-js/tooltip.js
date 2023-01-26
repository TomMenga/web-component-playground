class Tooltip extends HTMLElement {
  _tooltipContainer = null;
  _tooltipText = "Dummy text for tooltip"

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --color-primary: #00ff00;
        }

        div {
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10;
        }

        :host {
          padding: .15rem;
          border: 1px solid red;
        }

        :host-context(body) {
          font-weight: bold
        }

        ::slotted(.slotted) {
          background-color: var(--color-primary)
        }
      </style>
      <slot>Some default</slot>
      <span> (?)</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }

    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.innerText = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }
  
  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('lez-tooltip', Tooltip)