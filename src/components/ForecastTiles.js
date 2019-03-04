import React, { Component } from "react";
import DetailedInfo from "./DetailedInfo";

export default class ForecastTiles extends Component {

  // Filtra os dados por data e retorna um Objeto contendo uma lista de previsão de 5 dias.
    _groupByDays = data => {
        return (data.reduce((list, item) => {
            const forecastDate = item.dt_txt.substr(0,10);
            list[forecastDate] = list[forecastDate] || [];
            list[forecastDate].push(item);

            return list;
        }, {}));
    };

    // Retorna semana do dia
    _getDayInfo = data => {
        const daysOfWeek = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
        return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
    };

    // Busca o ícone usando o código de ícone disponível nos dados da previsão.
    _getIcon = data => `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;

    // Obtém as temperaturas mínima, máxima e média de umidade do dia.
    _getInfo = (data, min=[], max=[], humidity=[]) => {
        data.map(item => {
            max.push(item.main.temp_max);
            min.push(item.main.temp_min);
            humidity.push(item.main.humidity);
        });

        const minMax = {
            min: Math.round(Math.min(...min)),
            max: Math.round(Math.max(...max)),
        };

        // Obtém a umidade média do dia
        const avgHumdity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);

        return (
            <div className="weather-info">
                <div className="min-max">
                    <strong>{`${minMax.max}°C`}</strong> / {`${minMax.min}°C`}
                </div>
                <div className="more-info">
                    {`Avg. Humidity: ${avgHumdity}%`}
                </div>
            </div>
        );
    };

    // Alterna acordeão para exibir informações de tempo por hora
    _showMoreInfo = (index) => {
        const elm = this.refs[`div-${index}`];
        const expandedElment = document.querySelector(".expanded");

        elm.classList.add("expanded");
        expandedElment !== null && expandedElment.classList.remove("expanded");
    }

    render() {

    const { forecasts } = this.props;
    const tiles = Object.values(this._groupByDays(forecasts));

    // Quando o serviço da Web retorna dados por 6 dias corridos durante a noite como resultado de deslocamento,
    // Isso garante que estamos mostrando apenas 5 dias de previsão.
    const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

    return (
        <div className="forecast-tiles">
            {forecastTiles.map((item, i) => (
                <div
                className={`forecast-tile tile-${i}`}
                key={i}
                ref={`div-${i}`}
                onClick={() => {this._showMoreInfo(i)}}
                >
                    <div className="primary-info">
                        <div className="icon">
                        <img src={this._getIcon(item)} />
                        {this._getDayInfo(item)}
                        </div>
                        {this._getInfo(item)}
                    </div>
                    <div className="detailed-info" key={i}>
                        <DetailedInfo data={item} />
                    </div>
                </div>
            ))}
        </div>
    );
    }
}
// TODO: Adicionar validações defaultProps e PropType
