exports.data = {
  layout: "masterpiece.11ty.js",
  lang: "de",
  collectionID: "masterpiecesDE",
  pagination: {
    data: "collections.masterpiecesDE",
    size: 1,
    alias: "masterpiece",
    currentCollection: "collections.masterpiecesDE",
  },
  permalink: function(data){
    const item = data.pagination.items[0];
    return `/${data.lang}/${item.id}/`;
  }
};

exports.render = (data) => {
  return data.pagination.items[0];
};


