import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

function Card({ style, amount, input = null }) {
  return (
    <View style={[styles.container, style]}>
      <Image
        style={styles.bgImage}
        source={require('../assets/images/Rectangle.png')}
      />
      <View style={styles.content}>
        <View style={styles.section}>
          {input ? input : <Text style={styles.tokens}>{amount}</Text>}
          <Text style={styles.text}>TOKENS</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.divider} />
        </View>
        <View style={styles.section}>
          {input ? input : <Text style={styles.tokens}>{amount}</Text>}
          <Text style={styles.text}>STABLECOINS</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 135,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  bgImage: {
    top: 0,
    left: 0,
    height: 135,
    width: '100%',
    position: 'absolute',
  },
  content: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  section: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 2,
    height: '60%',
    backgroundColor: '#fff',
  },
  tokens: {
    fontSize: 60,
    color: '#fff',
    lineHeight: 60,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 16,
    textAlign: 'center',
  },
});

export default Card;
