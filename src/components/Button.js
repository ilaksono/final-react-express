const Button = props => {
  const { onClick, message } = props;
  return (
    <button onClick={onClick}>
      {message}
    </button>
  );
};

export default Button;