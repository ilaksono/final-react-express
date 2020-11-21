import React from "react";
import 'styles/Button.scss';
import classNames from 'classnames';

const Button = props => {
  let btnClass = classNames(
    'button', {
       'button--confirm': props.confirm,
       'button--danger': props.danger,
       'button--search': props.search,
       'button--nav': props.nav
    }
 );

  const { onClick, message } = props;
  return (
    <button onClick={onClick} className={btnClass}>
      {message}
    </button>
  );
};

export default Button;