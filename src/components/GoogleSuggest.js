import PropTypes from "prop-types";
import React from "react";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
const API_KEY = "AIzaSyDPN7RgxORR0HLOo0Iq9v2_L2TNlownf2E";
class GoogleSuggest extends React.Component {
  state = {
    search: "",
    value: "",
    results: []
  };


  handleInputChange(e) {
    this.setState({ search: e.target.value, value: e.target.value });
  }

  handleSelectSuggest(suggest) {
    console.log(suggest);
    console.log(ReactGoogleMapLoader);
    this.setState({ search: "", value: suggest.formatted_address });
  }

  render() {
    const { search, value } = this.state;
    console.log(this.state);
    return (
      <ReactGoogleMapLoader
        params={{
          key: API_KEY,
          libraries: "places, geometry, geocode",
        }}
        render={googleMaps =>
          googleMaps && (
            <div>
              <ReactGooglePlacesSuggest
                autocompletionRequest={{
                  input: search, componentRestrictions: {
                    country: ['us', 'ca']
                  }
                }}
                googleMaps={googleMaps}
                onSelectSuggest={this.handleSelectSuggest.bind(this)}
                customRender={prediction => console.log(prediction)}
              >
                <input
                  type="text"
                  value={value}
                  placeholder="Search a location motherfucker"
                  onChange={this.handleInputChange.bind(this)}
                />
              </ReactGooglePlacesSuggest>
            </div>
          )
        }
      />
    );
  }
}

GoogleSuggest.propTypes = {
  googleMaps: PropTypes.object,
};

export default GoogleSuggest;