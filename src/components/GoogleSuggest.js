import PropTypes from "prop-types"
import React from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"

const API_KEY = "AIzaSyBDPrmJAvGx0h968D3iPsJ1jmwcFMEcunQ"
class GoogleSuggest extends React.Component {
  state = {
    search: "",
    value: "",
  }

  handleInputChange(e) {
    this.setState({search: e.target.value, value: e.target.value})
  }

  handleSelectSuggest(suggest) {
    console.log(suggest)
    console.log(ReactGoogleMapLoader);
    this.setState({search: "", value: suggest.formatted_address})
  }

  render() {
    const {search, value} = this.state
    return (
      <ReactGoogleMapLoader
        params={{
          key: API_KEY,
          libraries: "places,geocode",
        }}
        render={googleMaps =>
          googleMaps && (
            <div>
              <ReactGooglePlacesSuggest
                autocompletionRequest={{input: search, componentRestrictions: {
                  country: ['us', 'ca']
                  }}}
                googleMaps={googleMaps}
                onSelectSuggest={this.handleSelectSuggest.bind(this)}
                customRender={prediction => (
                  <div className="customWrapper">
                      {prediction
                          ? prediction.description
                          : "My custom no results text"}
                  </div>
              )}
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
    )
  }
}

GoogleSuggest.propTypes = {
  googleMaps: PropTypes.object,
}

export default GoogleSuggest