/**
 * Convert string of tags to object
 * @param {String} tags String of tags e.g. 'layer:front,env:stage'
 */
export default function (tags) {
  return tags.split(',').reduce((obj, item) => {
    const [key, value] = item.split(':');
    // eslint-disable-next-line no-param-reassign
    obj[key] = value;
    return obj;
  }, {});
}
