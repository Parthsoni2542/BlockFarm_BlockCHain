
import React from 'react';
import { Model } from '../components/Model'
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import { useVoiceSearch } from '../hooks/useVoiceSearch';
import ProductSelectionCard from '../components/ProductSelectionCard';

const ProductSearch = ({ navigation }) => {
  const { result, visible, setResult, startVoiceSearch } = useVoiceSearch();

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <SearchBox
        value={result}
        onChangeText={text => setResult(text)}
        onPress={startVoiceSearch}
        placeholder='Search all farms...' />

      <ProductSelectionCard source={require('../assets/images/product.png')} title="East SEED1" number='$55.5' />

      <Model visible={visible} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: 'white'

  },

});


export default ProductSearch;
