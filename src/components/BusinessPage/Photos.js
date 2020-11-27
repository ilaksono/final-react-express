import "styles/BusinessPage.scss";
export default function Photos(props) {
  return (
    <div className='photos'>
      <img 
      src={props.photos}
      // style={{
      //   backgroundImage:`url(${props.photos})`
      // }}
        onClick={(event) =>
          props.clickPhoto(event.target.getAttribute('src'))}
        alt='photos'
        className='bus-images' />
    </div>
  );
}