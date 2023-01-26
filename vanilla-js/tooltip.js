class Tooltip extends HTMLElement {
  _tooltipVisible = false;
  _tooltipText = "Dummy text for tooltip"

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --color-primary: #00ff00;
          position: relative;
        }

        :host-context(body) {
          font-weight: bold
        }

        ::slotted(.slotted) {
          background-color: var(--color-primary)
        }

        div {
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10;
        }

      </style>
      <slot>Some default</slot>
      <span> (?)</span>
    `;
  }

  static get observedAttributes() {
    return ['text'];
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

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "text") {
      this._tooltipText = newValue;
    }
  }

  disconnectedCallback() {
    tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('div');

    if (this._tooltipVisible) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.innerText = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }
  
  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define('lez-tooltip', Tooltip)