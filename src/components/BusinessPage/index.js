import { Divider } from "@material-ui/core";
import {useContext, useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import { YelpContext } from 'YelpContext';
import "styles/BusinessPage.scss"

export default function BusinessPage() {
  console.log("page loaded")
  const { 
    businessDetails, 
    getIndividualBusinessData, 
    setBusinessDetails } = useContext(YelpContext);
    
    const {id} = useParams();

    useEffect(() => {
      if(!businessDetails.id) {
        getIndividualBusinessData(id)
      }
    })
      return (
      <div class='business-container'>
      <div class='images'> 

          {businessDetails.photos && <img src={businessDetails.photos[0]} alt='photos' class='place-imgs-1'/>}
          {businessDetails.photos && <img src={businessDetails.photos[1]} lass='place-imgs-2'/>}
          {businessDetails.photos && <img src={businessDetails.photos[2]} lass='place-imgs-3'/>}
      </div>
      <div class='info-section'>
        <div class='title'>
          <span>{businessDetails.name}</span><br/>
          <span>Comfort Rating</span><br/>
          <span>Yelp Rating</span>
        </div>
        <div class='contact-info'> 
          <span>{businessDetails.address}</span> <br/>
          <span>{businessDetails.city}</span> <br/>
          <span>{businessDetails.phone}</span> <br/>
        </div>
      </div>
      <div class='location-hours'>
          <span>Map</span><br/>
          <table>
      {businessDetails.hours && <tr>{`Monday:  ${businessDetails.hours[0].open[0].start} -  ${businessDetails.hours[0].open[0].end}`}  </tr> }
      {businessDetails.hours && <tr>{`Tuesday:  ${businessDetails.hours[0].open[1].start} -  ${businessDetails.hours[0].open[0].end}`}  </tr> }
      {businessDetails.hours && <tr>{`Wednesday:  ${businessDetails.hours[0].open[2].start} -  ${businessDetails.hours[0].open[0].end}`}  </tr> }
      {businessDetails.hours && <tr>{`Thursday:  ${businessDetails.hours[0].open[3].start} -  ${businessDetails.hours[0].open[0].end}`}  </tr> }
      {businessDetails.hours && <tr>{`Friday:  ${businessDetails.hours[0].open[4].start} -  ${businessDetails.hours[0].open[0].end}`}  </tr> }
      {businessDetails.hours && <tr>{`Saturday:  ${businessDetails.hours[0].open[5].start} -  ${businessDetails.hours[0].open[0].end}`}  </tr> }
      {businessDetails.hours && <tr>{`Sunday:  ${businessDetails.hours[0].open[6].start} -  ${businessDetails.hours[0].open[0].end}`}  </tr> }
          </table>
        </div>
        <div class='reviews'>
        reviews
        </div>
     </div>
  )}