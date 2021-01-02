import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './DeleteIcon.module.css';

const DeleteIcon = ({ size = 's', handleDelete, styleParams = null }) => {
  let styleIcon;
  switch (size) {
    case 's': {
      styleIcon = {
        fontSize: '18px',
        width: '18px',
      };
      break;
    }
    case 'm': {
      styleIcon = {
        fontSize: '20px',
        width: '20px',
      };
      styleParams = {
        padding: '3px',
      };
      break;
    }
    case 'l': {
      styleIcon = {
        fontSize: '26px',
        width: '26px',
      };
      break;
    }
    case 'xl': {
      break;
    }
    default:
      styleIcon = {
        fontSize: '26px',
        width: '26px',
      };
  }
  styleIcon.color = 'rgba(0, 0, 0, 0.65)';

  return (
    <button className={s.button} type="button" onClick={handleDelete} style={styleParams}>
      <FontAwesomeIcon icon={faTimes} style={styleIcon} />
    </button>
  );
};
// DeleteIcon.propTypes = {
//   size: PropTypes.string, handleDelete: PropTypes.func, styleParams?: PropTypes.object
// };

export default DeleteIcon;
