class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // removing fields
    const removeField = ["keyword", "page", "limit"];
    removeField.forEach((field) => delete queryCopy[field]);

    // filter for price
    if (queryCopy.price) {
      const priceGTE = queryCopy?.price?.gte || 0;
      const priceLTE = queryCopy?.price?.lte || 99999999;
      queryCopy.price = {
        $gte: priceGTE,
        $lte: priceLTE,
      };
    }

    // filter for rating
    if (queryCopy.rating) {
      const rating = queryCopy.rating;
      queryCopy.rating = {
        $gte: rating,
      };
    }

    this.query = this.query.find(queryCopy);
    return this;
  }

  pagination(productPerPage) {
    const currPage = +this.queryStr?.page || 1;
    const skipProducts = productPerPage * (currPage - 1)

    this.query = this.query.limit(productPerPage).skip(skipProducts)
    return this
  }
}

module.exports = ApiFeatures;
