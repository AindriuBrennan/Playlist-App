"use strict";



const search = {
  index(request, response) {
    const viewData = {
      title: "Search"
    };
    response.render("search", viewData);
  }




};

module.exports = search;
