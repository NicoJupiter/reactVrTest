import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

import {
    View,
  } from 'react-vr';
  
// Import all necessary libraries
// Note - these libs are available in index.vr.js,
// you can't use them in your own files
const NativeMethodsMixin = require('NativeMethodsMixin');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformColorPropTypes = require('LayoutAndTransformColorPropTypes');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const requireNativeComponent = require('requireNativeComponent');

const Magnet = createReactClass({
  
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformColorPropTypes),
  },

  viewConfig: {
      uiViewClassName: 'Mesh',
      validAttributes: {
        ...ReactNativeViewAttributes.RCTView,
      },
    },

    getDefaultProps() {

      return {};
    },

    render() {
      return (
        <RKMagnet {...this.props} />
      );
    },
});

const RKMagnet = requireNativeComponent('Magnet', Magnet, {
  nativeOnly: {},
});

export default Magnet;