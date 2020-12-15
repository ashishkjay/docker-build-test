import React, { Component } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import './SearchBar.css'
import _, { debounce } from 'lodash';


class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // fireRedirect: false,  not using this
            input: '',
            productidlist: [],
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.SearhAgainstAPI = this.SearhAgainstAPI.bind(this);
    }
    onInputChange(input) {
        const name = this.props.searchBoxName || undefined
        this.setState({ input });
        if (this.props.onSearchInputChange) {
            this.props.onSearchInputChange({ name, input })
        }
    }


    SearhAgainstAPI() {
        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };


        const input = this.state.input
        console.log(this.state.input)
        const searchinput = input
        const url = 'https://devops-insights-dev.optum.com/api/v2/insights/techlandscape-search/search?search_query=' + searchinput

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                let tmpArray = []
                for (var i = 0; i < data.records.length; i++) {
                    tmpArray.push(data.records[i].product_id)
                }

                this.setState({
                    productidlist: tmpArray
                })
            })
            .catch(error => console.log('error', error))

        const { productidlist } = this.state;

        let history = useHistory();
        console.log(productidlist)
        !productidlist.length ? history.push("/product_id=not-found") : history.push("/product_id=" + productidlist)
    }

    render() {
        const name = this.props.searchBoxName || undefined;
 
        return (
            < div className = "search-box" id = "search" >
            <form id="search">
                <input
                    name={name}
                    className="search-input"
                    id="search"
                    type="search"
                    placeholder="Product Name"
                    value={this.state.input}
                    onChange={event => this.onInputChange(event.target.value)}
                >
                </input>
                <button type="button" onClick={this.SearhAgainstAPI} > Go </button>
            </form>
        </div >
        )
    }
}

export default SearchBar;