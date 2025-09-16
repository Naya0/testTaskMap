import { StyleSheet } from 'react-native';

export const colors = {
  text: '#333333',
  subtext: '#8a8888',
  gray: '#8E8E93',
};

export const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-start',
  },

  shiftCard: {
    position: 'relative',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 8,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  shiftCardContainer: {
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },

  textCompanyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  containerContent: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    padding: 8,
    gap: 3,
  },
  text: {
    fontSize: 14,
    color: colors.text,
  },
  textBold: {
    fontWeight: 'bold',
  },
  subtext: {
    flexWrap: 'wrap',
    fontSize: 14,
    color: colors.subtext,
  },
  logoCompany: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  logoCompanyContainer: {
    paddingTop: 8,
    paddingLeft: 8,
    width: 70,
    height: 70,
  },
  borderLine: {
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray,
  }
});
