import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const withLoading = (WrappedComponent, loadingProp = 'isLoading') => (props) => {
  if (props[loadingProp]) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <WrappedComponent {...props} />;
};

export default withLoading;
