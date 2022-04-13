import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class InputSearch extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            options: [],
            city:''
        }
    }
    componentDidMount = () => {
    }

    
    onchange = async (event) => {
      
        const response = await fetch(`https://www.airbnb.com/api/v2/autocompletes?country=PS&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&language=en&locale=en&num_results=5&user_input=${event.target.value}&api_version=1.2.0&satori_config_token=EhIiQhIiIjISEjISIiIiNQAiQgA&region=-1&options=should_filter_by_vertical_refinement%7Chide_nav_results%7Cshould_show_stays%7Csimple_search`);
        const countries = await response.json();
        this.setState({ options: countries.autocomplete_terms.map((country, i) => country) });
    }

    onSelect = async (ev, value) => {
      
        if (value) {
            this.props.cityAndCountry(value.display_name)
          let val=value.display_name.split(",")[0]
            await this.setState({ city: val })
            this.props.searchValue(val)
        }
    }

    render() {
        return (
            <div style={{ width: 200, paddingLeft: "8px", marginTop: "8px" }}>
                <Autocomplete
                    onChange={this.onSelect}
                    id="asynchronous-demo"
                    open={this.state.open}
                    onOpen={() => {
                        this.setState({ open: true });
                    }}
                    onClose={() => {
                        this.setState({ open: false });
                    }}
                    // getOptionSelected={(option, value) => option.PlaceName === value.PlaceName}
                    getOptionLabel={(option) =>
                       option.display_name
                    }
                    options={this.state.options}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            // variant="filled"
                            onChange={this.onchange}
                        />
                    )}
                />
            </div>
        )
    }
}

export default InputSearch;