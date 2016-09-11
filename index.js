/**
 * @providesModule ProgressIndicator
 */

'use strict';

import React from 'react';
import {
  ActivityIndicatorIOS,
  ActivityIndicator,
  ProgressViewIOS,
  View,
  Platform
} from 'react-native';

const _cleanInvalidProps = (props, validProps) => {
  let newProps = {};
  for(let k in props) {
    if(validProps.hasOwnProperty(k)) newProps[k] = props[k];
  }

  return newProps;
};

const ProgressIndicator = (props) => {
  if (Platform.OS !== 'ios') { /* isAndroid */
    const passProps = _cleanInvalidProps(Object.assign({}, props), ProgressBarAndroid.propTypes);
    if("size" in props) {
      if(props.size === "large" || props.size === "small") {
        passProps.styleAttr = (props.size === "large") ? "Large" : "Small";
      }
    }

    return <ActivityIndicator {...passProps} />;
  } else {
    if ("progress" in props) {
      const passProps = _cleanInvalidProps(Object.assign({}, props), ProgressViewIOS.propTypes);
      return <ProgressViewIOS {...passProps} />;
    } else {
      const passProps = _cleanInvalidProps(Object.assign({}, props), ActivityIndicatorIOS.propTypes);
      if("styleAttr" in props) {
        if(props.styleAttr === "Large" || props.styleAttr === "Small") {
          passProps.size = ("" + props.styleAttr).toLowerCase();
        }
      }

      return <ActivityIndicatorIOS {...passProps} />;
    }
  }
};

module.exports = ProgressIndicator;
