
import React from 'react'
import { View, ActivityIndicator } from 'react-native'

export const FullScreenLoaders = () => {
  return (
    <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
      <ActivityIndicator size='large' color={'indigo'}/>
    </View>
  )
}
