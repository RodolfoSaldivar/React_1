import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {Carousel, Parallax} from 'react-materialize'
// import { Switch, Route } from 'react-router'
import './index.css';



//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//----> Todo el codigo para el tablero

class Tablero extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			num: 1
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event)
	{
		var	nuevo = event.target.value;
		if (nuevo > 15) nuevo = 15;
		if (nuevo < 0) nuevo = 0;
		this.setState({num: nuevo});
	}

	render()
	{
        return (
			<div>
			    <div className="row">
			    	<div className="input-field col s2">
						<input id="num" type="number" value={this.state.num} onChange={this.handleChange} />
					</div>
			    </div>
		    	<Piramide num={this.state.num} />
			</div>
        );
    }
}

class Piramide extends React.Component
{
	hacerPiramide(limite)
	{
		if (limite <= 0) return [];

		var columnas = [];
		for (var i = 1; i<=limite; i++)
		{
			var filas = [];
			for (var j = 1; j<=limite-i+1; j++)
			{
				var color = 0;
				switch (j % 3)
				{
					case 0: color = 'cyan'; break;
					case 1: color = 'red'; break;
					case 2: color = 'blue'; break;
				}
				filas[j] = {num:j, color: color};
			}

			var filasBtn = filas.map((cell) =>
				<Casilla columna={i} num={cell.num} color={cell.color} />
			);
			filasBtn[limite+1] = <br/>;
			columnas[i] = filasBtn;
		}
		return columnas;
	}

	render()
	{
        return (
			<div>
			    {this.hacerPiramide(this.props.num)}
			</div>
        );
    }
}

//----> La clase casilla que viene siendo el boton
function Casilla(props)
{
	return <a key={props.columna+'_'+props.num} className={"btn "+props.color}>{props.num}</a>
}

//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//----> Todo el codigo para las cards

class Cards extends React.Component
{
	render()
	{
		return (
			<CardForm />
		);
	}
}

class CardForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			titulo: '',
			descripcion: '',
			nombre_img: '',
			foto: '',
			tarjetas: []
		};
		this.cambioTitulo = this.cambioTitulo.bind(this);
		this.cambioDescripcion = this.cambioDescripcion.bind(this);
		this.cambioFoto = this.cambioFoto.bind(this);
		this.agregarCard = this.agregarCard.bind(this);
	}

	cambioTitulo(event) { this.setState({titulo: event.target.value}); }
	cambioDescripcion(event) { this.setState({descripcion: event.target.value}); }
	cambioFoto(event)
	{
		let reader = new FileReader();
		let file = event.target.files[0];

		reader.onloadend = () => {
			this.setState({
				nombre_img: file.name,
				foto: reader.result
			})
		}
		reader.readAsDataURL(file);
	}

	agregarCard()
	{
		if (this.state.titulo === '' ||
			this.state.descripcion === '' ||
			this.state.foto === '')
			return null;

		let tarjetas = this.state.tarjetas;
		tarjetas.push({
			titulo: this.state.titulo,
			descripcion: this.state.descripcion,
			foto: this.state.foto,
		});

		this.setState({
			tarjetas: tarjetas,
			titulo: '',
			descripcion: '',
			nombre_img: '',
			foto: ''
		})
	}


	render()
	{
		return (
			<div>
				<div className="row">
					<div className="input-field col s3">
						<input id="titulo" type="text" value={this.state.titulo} onChange={this.cambioTitulo} />
						<label htmlFor="titulo">Título</label>
					</div>
					<div className="input-field col s3">
						<input id="descripcion" type="text" value={this.state.descripcion} onChange={this.cambioDescripcion} />
						<label htmlFor="descripcion">Descripción</label>
					</div>
					<div className="file-field input-field col s3">
						<div className="btn">
							<span>Foto</span>
							<input type="file" onChange={this.cambioFoto} />
						</div>
						<div className="file-path-wrapper">
							<input className="file-path validate" type="text" value={this.state.nombre_img} />
						</div>
					</div>
					<div className="input-field col s3">
						<img style={{width:'100%'}} src={this.state.foto} />
					</div>
				</div>
				<div className="row">
					<div className="center">
						<a className="waves-effect waves-light btn" onClick={this.agregarCard.bind(this)}>Agregar</a>
					</div>
				</div>
				<div className="row">
					<Coleccion tarjetas={this.state.tarjetas} />
				</div>
			</div>
		);
	}
}

class Coleccion extends React.Component
{
	render()
	{
		const todas_tarjetas = this.props.tarjetas.map((elem, key) =>
			<Tarjeta key={key} foto={elem.foto} titulo={elem.titulo} descripcion={elem.descripcion} />
		);

		return todas_tarjetas;
	}
}

const Tarjeta = (props) => (
	<div key={props.key} className="col s4">
		<div className="card">
			<div className="card-image waves-effect waves-block waves-light">
				<img className="activator" src={props.foto}/>
			</div>
			<div className="card-content">
				<span className="card-title activator grey-text text-darken-4">
					{props.titulo}
					<i className="material-icons right">more_vert</i>
				</span>
			</div>
			<div className="card-reveal">
				<span className="card-title grey-text text-darken-4">
					{props.titulo}
					<i className="material-icons right">close</i>
				</span>
				<p>{props.descripcion}</p>
			</div>
		</div>
	</div>
);

//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//----> Todo el codigo para el parallax


class ParallaxDemo extends React.Component
{
	constructor(props)
	{
		super(props);
		this.imagenes = [
			{img: require('./img/fog.jpg'), clase: 'hide'},
			{img: require('./img/cave.jpg'), clase: 'hide'},
			{img: require('./img/drop.jpg'), clase: 'hide'},
			{img: require('./img/forest.jpg'), clase: 'hide'},
			{img: require('./img/thunder.jpg'), clase: 'hide'},
			{img: require('./img/clouds.jpg'), clase: 'hide'}
		];
		this.state = {i:0};
		this.quitarPoner = this.quitarPoner.bind(this);
	}

	quitarPoner(key)
	{
		if (this.imagenes[key].clase == 0) this.imagenes[key].clase = 'hide';
		else this.imagenes[key].clase = 0;
		let i = this.state.i + 1;
		this.setState({i: i});
	}

	render()
	{
		let lista_i = this.imagenes.map((elem, key) =>
			<div className='col s4' key={key}>
				<input type="checkbox" id={"test_"+key} onClick={this.quitarPoner.bind(this, key)} />
				<label htmlFor={"test_"+key}><img style={{maxHeight:'150px'}} src={elem.img}/></label>
			</div>
		);

		let lista_p = this.imagenes.map((elem, key) =>
			<div key={key} className={elem.clase}>
				<Parallax imageSrc={elem.img}/>
				<div className="section white">
					<div className="row container">
						<br/><br/><br/>
					</div>
				</div>
			</div>
		);

		return (
			<div>
				<div className='row'>
					{lista_i}
				</div>
				<div>
					{lista_p}
				</div>
			</div>
		);
	}
};



//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//----> Se hace el render del output y los links


// function App(props)
// {
// 	return (
// 		<div>
// 			11
// 		</div>
// 	);
// }

const App = (props) => (
	<div>
		<Header />
		<Main />
	</div>
);

const Header = (props) => (
	<nav>
		<div className="nav-wrapper">
			<ul id="nav-mobile" className="left">
				<li><Link to='/'>Tablero</Link></li>
				<li><Link to='/cards'>Cards</Link></li>
				<li><Link to='/parallax'>ParallaxDemo</Link></li>
			</ul>
		</div>
	</nav>
);

const Main = (props) => (
	<main>
		<Switch>
			<Route exact path='/' component={Tablero}/>
			<Route path='/cards' component={Cards}/>
			<Route path='/parallax' component={ParallaxDemo}/>
		</Switch>
	</main>
);

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);