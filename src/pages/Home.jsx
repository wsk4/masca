import React from 'react';
import { Container } from 'react-bootstrap';

function Home() {
  return (
    <>
    <div className="section grey lighten-3">
        <div className="container row valign-wrapper">
          <div className="col s12 m6">
            <h4>Mascapitos Store</h4>
            <p>
              Nuestra tienda online ofrece productos seleccionados de todas las regiones.
              Encuentra lo que necesitas al mejor precio.
            </p>
          </div>
          <div className="col s12 m6">
            <div className="card grey lighten-2 logo2">
              <img src="../Mascapitos Store/img/logo.webp" alt="Logo" className="logostyle" />
            </div>
          </div>
        </div>
      </div>
      <div className="container section">
        <div className="row">
          <div className="col s12 m6 l3">
            <div className="card">
              <div className="card-image">
                <img src="../Mascapitos Store/img/valentino.webp" alt="Producto" />
                <a className="btn-floating waves-effect waves-light black redirigir" data-url="../Mascapitos Store/html/valentino.html">
                  <i className="material-icons">add</i>
                </a>
              </div>
              <div className="card-content center">
                <p><a href="../Mascapitos Store/html/valentino.html">Valentino</a></p>
                <p>Born in Roma</p>
                <p><strong>$100.000</strong></p>
              </div>
            </div>
          </div>
          <div className="col s12 m6 l3">
            <div className="card">
              <div className="card-image">
                <img src="../Mascapitos Store/img/perfume.webp" alt="Producto" />
                <a className="btn-floating waves-effect waves-light black redirigir" data-url="../Mascapitos Store/html/armani.html">
                  <i className="material-icons">add</i>
                </a>
              </div>
              <div className="card-content center">
                <p><a href="../Mascapitos Store/html/armani.html">Armani</a></p>
                <p>Stronger With You</p>
                <p><strong>$110.000</strong></p>
              </div>
            </div>
          </div>
          <div className="col s12 m6 l3">
            <div className="card">
              <div className="card-image">
                <img src="../Mascapitos Store/img/devocion.webp" alt="Producto" />
                <a className="btn-floating waves-effect waves-light black redirigir" data-url="../Mascapitos Store/html/dolce.html">
                  <i className="material-icons">add</i>
                </a>
              </div>
              <div className="card-content center">
                <p><a href="../Mascapitos Store/html/dolce.html">Dolce Gabanna</a></p>
                <p>Devotion</p>
                <p><strong>$100.000</strong></p>
              </div>
            </div>
          </div>
          <div className="col s12 m6 l3">
            <div className="card">
              <div className="card-image">
                <img src="../Mascapitos Store/img/phantome_11zon.webp" alt="Producto" />
                <a className="btn-floating waves-effect waves-light black redirigir" data-url="../Mascapitos Store/html/Phantome.html">
                  <i className="material-icons">add</i>
                </a>
              </div>
              <div className="card-content center">
                <p><a href="../Mascapitos Store/html/phantome.html">Paco Rabanne</a></p>
                <p>Phantome</p>
                <p><strong>$95.000</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="page-footer teal darken-4">
        <div className="container">
          <div className="row valign-wrapper">
            <div className="col l6 s12 center-align">
              <img src="../Mascapitos Store/img/logo.webp" alt="Logo" className="footer-logo responsive-img" />
            </div>
            <div className="col l3 s6">
              <h5 className="white-text">Categorías</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="#!">Perfume</a></li>
              </ul>
            </div>
            <div className="col l3 s6">
              <h5 className="white-text">Información</h5>
              <form>
                <div className="input-field">
                  <input id="email" type="email" className="white-text" />
                  <label htmlFor="email">Ingresa tu mail</label>
                </div>
                <button className="btn waves-effect waves-light" type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
