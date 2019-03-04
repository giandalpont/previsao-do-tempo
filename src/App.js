import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchData } from "./actions/weatherStation";

import WeatherForecast from './components/WeatherForecast';

@connect(store => {  
    return {
        forecast: store.weatherStation.data
    }
})
export default class App extends Component {

  // Busca dados usando geolocalização. Se o usuário bloquear ou se o navegador não suportar a API,
  // callback para a localização padrão de Londres
    componentDidMount() {  
        const detectLocation = new Promise((resolve,reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve(position.coords);
                }, (error) => {
                    if(error.code === error.PERMISSION_DENIED) {
                    console.error("Erro ao detectar o local.");
                    }
                });
            }
        });

        detectLocation.then((location) => {
            this.props.dispatch(fetchData(location));
        }).catch(() => {
            this.props.dispatch(fetchData("london"));
        });
    }

    render() {
        const { forecast } = this.props;

        return (
            forecast === null ? (
            <div className="loading">
                <div className="spinner"></div>
            </div>
            ) : (
            <div>
                <WeatherForecast data={forecast} />
            </div>
            )
        );
    }
}