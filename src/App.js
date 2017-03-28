import React from 'react';
import NewsList from './NewsFeed';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const LIST = require('./data');

export default class NewFeeds extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            selectValue: null,
            options: LIST.data,
            isLoading: false
        }
        this.updateValue = this.updateValue.bind(this);
    }

    componentWillMount() {
        this.initialRendering();
    }

    initialRendering = () => {
        this.setState({
            selectValue: LIST.data[0].value
        })
        this.getData();
    }

    getData = (e) => {
        let sourceType = e ? e : "abc-news-au";
        this.setState({isLoading: true});
        fetch(`https://newsapi.org/v1/articles?source=${sourceType}&apiKey=81567e515e5e4acf83d6ed7271aca809`)
            .then(response => response.json())
            .then(({articles:items})=>this.setState(
                {items}
            )).catch(()=> {
            console.log("failed to load")
        }).then(()=> {
            this.setState({isLoading: false})
        });
    }

    updateValue = (newValue)=> {
        this.setState({
            selectValue: newValue
        });
        this.getData(newValue);
    }

    render() {

        return(
         <div className="container">
             <div className="row">
                 <div className="col-md-4">
                     Facebook ...
                 </div>
                 <div className="col-md-4">
                     <Select ref="stateSelect"
                             autofocus options={this.state.options}
                             simpleValue
                             clearable
                             searchable
                             placeholder="choose categoryy..."
                             name="selected-state"
                             value={this.state.selectValue}
                             onChange={this.updateValue}
                     />
                 </div>
                <NewsList items={this.state.items}/>
                 <div className={`show-loader ${this.state.isLoading ? "" : "hide"}`}></div>
             </div>
         </div>
        )
    }
}