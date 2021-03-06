import React from 'react';
import getStyle from './style.css.js';
import { getViewPort } from '../../util';

export default class Container extends React.Component {
  static propTypes = {
    /**
     * Content of the component
     */
    children: React.PropTypes.node,
    /**
     * True makes the container full-width, false fixed-width
     */
    fluid: React.PropTypes.bool,
    /**
     * Optional styling
     */
    style: React.PropTypes.object,
  };

  static contextTypes = {
    phone: React.PropTypes.bool,
    tablet: React.PropTypes.bool,
  };

  static defaultProps = {
    fluid: false,
  };

  componentWillMount = () => {
    this.setViewport();
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.setViewport);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.setViewPort);
  }

  setViewport = () => {
    this.setState({ viewport: getViewPort(this.context) });
  }

  render = () => {
    const style = getStyle({
      fluid: this.props.fluid,
      viewport: this.state.viewport,
    });
    return (
      <div style={{ ...style, ...this.props.style }}>
        {this.props.children}
      </div>
    );
  }
}
