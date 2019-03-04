# Previsão do Tempo
Aplicação de previsão do tempo, consumindo a API de consulta da previsão do tempo do OpenWeatherMap.

## Pré-requisitos
* Node.js 9.8.0 a cima

## Run

```
git clone https://github.com/giandalpont/previsao-do-tempo.git
cd previsao-do-tempo
npm i
```

## Inicie o servidor dev

```
npm run start:dev
```

## Build

```
npm run build
```

#### Notes:
* Executando a construção empacota todas as suas atualizações para ```bundle.js``` e ```bundle.css``` na pasta dist.
* Se você insistir em automatizar a criação ao anexar alterações a arquivos, ```webpack --watch```

## Teste

```
npm run test
```

#### Notes:
* O teste de unidade pode ser feito manualmente, executando o comando acima.
* Isso será feito automaticamente antes de confirmar as atualizações no repositório como um gancho de pré-consolidação.