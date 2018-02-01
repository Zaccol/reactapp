import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            seriesList: [],
            seriesEpisodesList: [],
            seriesTrouve: [],
            episodesTrouve: []
        };
    }

    componentDidMount() {

        fetch('seriesList.json',{})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                alert("Series OK");
            });

        fetch('seriesEpisodesList.json',{})
            .then(response => response.json())
            .then(seriesEpisodesListDepuisFichier => {
                this.setState({seriesEpisodesList: seriesEpisodesListDepuisFichier});

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                alert("Episodes OK");
            });

    }

    rechercheSeries = event => {
        let entre = document.getElementById("input").value.toLowerCase();
        console.log(entre)
        let matchingSeries = this.state.seriesList.filter(
            a => a.seriesName.toLowerCase().indexOf(entre) > -1
        );
        console.log(matchingSeries)

        this.setState({seriesTrouve: matchingSeries});

        let matchingSerieEpisodesLists;
        for(let i=0; i<matchingSeries.length; i++) {

            matchingSerieEpisodesLists = this.state.seriesEpisodesList.filter(
                b => b.serie_id == matchingSeries[i].id
            );
            console.log(matchingSerieEpisodesLists)

            this.setState({episodesTrouve: matchingSerieEpisodesLists});
        }
    };

    render() {



        return (
            <div>
                <input type="text" id="input">
                </input>
                <button onClick={e => this.rechercheSeries(e)}>Rechercher</button>
                <ul>
                    {this.state.seriesTrouve.length ?
                        this.state.seriesTrouve.map(item => <li key={item.id}>{item.seriesName}</li>)
                        : <li>Faites une recherche...</li>
                    }
                </ul>


                <ul>
                    {this.state.seriesTrouve.length ?
                        this.state.episodesTrouve[0].episodes_list.map(item => <li key={item.id}>{item.episodeName}</li>)
                        : <p></p>
                    }
                </ul>


            </div>
        )
    }
}


export default App;
