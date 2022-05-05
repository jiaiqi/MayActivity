export const renderEmoji = (str = '') => {
  if (str) {
    try {
      str = str.replace(/\&\#(.*?);/g, (match, key) => {
        if (key) {
          key = '0' + key
        }
        if (String.fromCodePoint) {
          return String.fromCodePoint(key)
        }
      })
    } catch (e) {
      //TODO handle the exception
      console.error('renderEmojiErr', e)
    }
  }
  return str
}
