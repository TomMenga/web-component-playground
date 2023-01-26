class Modal extends HTMLElement { 

  _showing = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none
        }

        :host(.modal-open) {
          display: initial;
        }

        :host-context(body) {
        }

        ::slotted() {
        }

        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,.75);
          z-index: 10;
        }

        #modal {
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          background: white;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(0,0,0,.26);
          padding: .5rem;
          z-index: 100;
          display: flex;
          flex-direction: column;
        }

        #main {
        }

        #actions {
          border-top: 1px solid #ccc;
          margin-top: 1rem;
          padding: .5rem 0;
          text-align: end;
          display: flex;
          justify-content: flex-end;
        }

      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <slot name="title"></slot>
        </header>
        <section id="main">
          <slot>Modal content</slot>
        </section>
        <section id="actions">
          <button>Cancel</button>
          <button>Confirm</button>
        </section>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['opened'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (this.hasAttribute('opened')) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this._showing = true;
    this.setAttribute('opened', '');
    this._render();
  }

  hide() {
    this._showing = false;
    this.removeAttribute('opened');
    this._render();
  }

  _render() {

    if (this._showing) {
      this.classList.add('modal-open');
    } else {
      this.classList.remove('modal-open');
    }
  }

}

customElements.define('lez-modal', Modal)