const sortBy = (data, property, ascending) => {
  if (ascending) {
    return data.sort((a, b) => Number(a[property]) - Number(b[property]));
  } else {
    return data.sort((a, b) => Number(b[property]) - Number(a[property]));
  }
}

sortBy(mockSearchData, "rating", true);
sortBy(mockSearchData, "rating", true);

const mockSearchData = [
  {
    "id": "0W4lkclzZThpx3V65bVgig",
    "alias": "schwartzs-montréal-4",
    "name": "Schwartz's",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/REAW-WtquHDgSs-HWMro-g/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/schwartzs-montr%C3%A9al-4?adjust_creative=iqnuEIVEAHVyqp3-szgKBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iqnuEIVEAHVyqp3-szgKBA",
    "review_count": 2697,
    "categories": [
      {
        "alias": "delis",
        "title": "Delis"
      },
      {
        "alias": "sandwiches",
        "title": "Sandwiches"
      }
    ],
    "rating": 4,
    "coordinates": {
      "latitude": 45.516353,
      "longitude": -73.577642
    },
    "transactions": [],
    "price": "$$",
    "location": {
      "address1": "3895 Boulevard Saint-Laurent",
      "address2": "",
      "address3": "",
      "city": "Montreal",
      "zip_code": "H2W 1X9",
      "country": "CA",
      "state": "QC",
      "display_address": [
        "3895 Boulevard Saint-Laurent",
        "Montreal, QC H2W 1X9",
        "Canada"
      ]
    },
    "phone": "+15148424813",
    "display_phone": "+1 514-842-4813",
    "distance": 514.4026575125611
  },
  {
    "id": "J6qWt6XIUmIGFHX5rQJA-w",
    "alias": "l-avenue-montréal",
    "name": "L'Avenue",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/x2LT3Xe670JCXJBxkuIBPg/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/l-avenue-montr%C3%A9al?adjust_creative=iqnuEIVEAHVyqp3-szgKBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iqnuEIVEAHVyqp3-szgKBA",
    "review_count": 1150,
    "categories": [
      {
        "alias": "breakfast_brunch",
        "title": "Breakfast & Brunch"
      }
    ],
    "rating": 4.5,
    "coordinates": {
      "latitude": 45.5266781712886,
      "longitude": -73.5802391312828
    },
    "transactions": [],
    "price": "$",
    "location": {
      "address1": "922 Avenue du Mont-Royal E",
      "address2": "",
      "address3": "",
      "city": "Montreal",
      "zip_code": "H2J 1X2",
      "country": "CA",
      "state": "QC",
      "display_address": [
        "922 Avenue du Mont-Royal E",
        "Montreal, QC H2J 1X2",
        "Canada"
      ]
    },
    "phone": "+15145238780",
    "display_phone": "+1 514-523-8780",
    "distance": 1382.5114013623443
  },
  {
    "id": "IhM1UBvAMM5Fia4f_v1wdQ",
    "alias": "el-nahual-tacos-toronto-7",
    "name": "El Nahual Tacos",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/OckGmXERarQeEJSuZDTWbQ/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/el-nahual-tacos-toronto-7?adjust_creative=iqnuEIVEAHVyqp3-szgKBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iqnuEIVEAHVyqp3-szgKBA",
    "review_count": 118,
    "categories": [
        {
            "alias": "mexican",
            "title": "Mexican"
        }
    ],
    "rating": 4.5,
    "coordinates": {
        "latitude": 43.6663274,
        "longitude": -79.4065874
    },
    "transactions": [],
    "price": "$",
    "location": {
        "address1": "384 Bloor street west",
        "address2": null,
        "address3": null,
        "city": "Toronto",
        "zip_code": "M5S 1X2",
        "country": "CA",
        "state": "ON",
        "display_address": [
            "384 Bloor street west",
            "Toronto, ON M5S 1X2",
            "Canada"
        ]
    },
    "phone": "+14169012988",
    "display_phone": "+1 416-901-2988",
    "distance": 885.6433445819039
  },
  {
      "id": "7hcxAsYC5R8BIcm1xQ_1_Q",
      "alias": "birria-catrina-toronto",
      "name": "Birria Catrina",
      "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/IrfxVvgbS-myx2TdkClQ7g/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/birria-catrina-toronto?adjust_creative=iqnuEIVEAHVyqp3-szgKBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iqnuEIVEAHVyqp3-szgKBA",
      "review_count": 3,
      "categories": [
          {
              "alias": "mexican",
              "title": "Mexican"
          }
      ],
      "rating": 4,
      "coordinates": {
          "latitude": 43.6547751,
          "longitude": -79.4022239754631
      },
      "transactions": [],
      "location": {
          "address1": "214 Augusta Avenue",
          "address2": null,
          "address3": "",
          "city": "Toronto",
          "zip_code": "M5T 2L8",
          "country": "CA",
          "state": "ON",
          "display_address": [
              "214 Augusta Avenue",
              "Toronto, ON M5T 2L8",
              "Canada"
          ]
      },
      "phone": "+16475327104",
      "display_phone": "+1 647-532-7104",
      "distance": 2217.0668158239832
  },
  {
      "id": "o6Yor6ofIw2TqM3mN28Kzg",
      "alias": "tacos-el-asador-toronto",
      "name": "Tacos El Asador",
      "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/X9c2o7IxrvDUtp-tUUsS4A/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/tacos-el-asador-toronto?adjust_creative=iqnuEIVEAHVyqp3-szgKBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iqnuEIVEAHVyqp3-szgKBA",
      "review_count": 292,
      "categories": [
          {
              "alias": "mexican",
              "title": "Mexican"
          },
          {
              "alias": "latin",
              "title": "Latin American"
          }
      ],
      "rating": 4,
      "coordinates": {
          "latitude": 43.6636499,
          "longitude": -79.41686
      },
      "transactions": [],
      "price": "$",
      "location": {
          "address1": "689 Bloor Street W",
          "address2": "",
          "address3": "",
          "city": "Toronto",
          "zip_code": "M6G 1L2",
          "country": "CA",
          "state": "ON",
          "display_address": [
              "689 Bloor Street W",
              "Toronto, ON M6G 1L2",
              "Canada"
          ]
      },
      "phone": "+14165389747",
      "display_phone": "+1 416-538-9747",
      "distance": 1306.345259116385
  },
  {
      "id": "O_UC_izJXcAmkm6HlEyGSA",
      "alias": "playa-cabana-toronto",
      "name": "Playa Cabana",
      "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/7XPqyMO4KYppNbsKccwqyA/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/playa-cabana-toronto?adjust_creative=iqnuEIVEAHVyqp3-szgKBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iqnuEIVEAHVyqp3-szgKBA",
      "review_count": 430,
      "categories": [
          {
              "alias": "mexican",
              "title": "Mexican"
          },
          {
              "alias": "bars",
              "title": "Bars"
          }
      ],
      "rating": 4,
      "coordinates": {
          "latitude": 43.6759577692695,
          "longitude": -79.4011840224266
      },
      "transactions": [],
      "price": "$$",
      "location": {
          "address1": "111 Dupont Street",
          "address2": "",
          "address3": "",
          "city": "Toronto",
          "zip_code": "M5R 1V4",
          "country": "CA",
          "state": "ON",
          "display_address": [
              "111 Dupont Street",
              "Toronto, ON M5R 1V4",
              "Canada"
          ]
      },
      "phone": "+14169293911",
      "display_phone": "+1 416-929-3911",
      "distance": 676.4922495495168
  },
  {
      "id": "PGRVqqPqR2hIZNRLqlPxag",
      "alias": "good-hombres-toronto",
      "name": "Good Hombres",
      "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/hH-CsvpWGibQXpRvAnDVFw/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/good-hombres-toronto?adjust_creative=iqnuEIVEAHVyqp3-szgKBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iqnuEIVEAHVyqp3-szgKBA",
      "review_count": 73,
      "categories": [
          {
              "alias": "mexican",
              "title": "Mexican"
          }
      ],
      "rating": 4.5,
      "coordinates": {
          "latitude": 43.65326,
          "longitude": -79.40675
      },
      "transactions": [],
      "location": {
          "address1": "374 Bathurst Street",
          "address2": "",
          "address3": null,
          "city": "Toronto",
          "zip_code": "M5T 2S6",
          "country": "CA",
          "state": "ON",
          "display_address": [
              "374 Bathurst Street",
              "Toronto, ON M5T 2S6",
              "Canada"
          ]
      },
      "phone": "+14168620425",
      "display_phone": "+1 416-862-0425",
      "distance": 2324.7127488732417
  },
  {
      "id": "iGEvDk6hsizigmXhDKs2Vg",
      "alias": "seven-lives-tacos-y-mariscos-toronto",
      "name": "Seven Lives Tacos y Mariscos",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/4vmIs9jTNYlK24wb2WrQLg/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/seven-lives-tacos-y-mariscos-toronto?adjust_creative=iqnuEIVEAHVyqp3-szgKBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iqnuEIVEAHVyqp3-szgKBA",
      "review_count": 1323,
      "categories": [
          {
              "alias": "mexican",
              "title": "Mexican"
          }
      ],
      "rating": 4.5,
      "coordinates": {
          "latitude": 43.6543411559068,
          "longitude": -79.4004796072841
      },
      "transactions": [],
      "price": "$",
      "location": {
          "address1": "72 Kensington Avenue",
          "address2": "",
          "address3": "",
          "city": "Toronto",
          "zip_code": "M5T 2K1",
          "country": "CA",
          "state": "ON",
          "display_address": [
              "72 Kensington Avenue",
              "Toronto, ON M5T 2K1",
              "Canada"
          ]
      },
      "phone": "+14163934636",
      "display_phone": "+1 416-393-4636",
      "distance": 2302.4874218313544
  },
  {
      "id": "eYeFOcNJO2iTNPCPi8XAxw",
      "alias": "el-pocho-antojitos-bar-toronto",
      "name": "El Pocho Antojitos Bar",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/cMSjaQ-Km15ZsOjf4pHXeQ/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/el-pocho-antojitos-bar-toronto?adjust_creative=iqnuEIVEAHVyqp3-szgKBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iqnuEIVEAHVyqp3-szgKBA",
      "review_count": 64,
      "categories": [
          {
              "alias": "bars",
              "title": "Bars"
          },
          {
              "alias": "breakfast_brunch",
              "title": "Breakfast & Brunch"
          },
          {
              "alias": "mexican",
              "title": "Mexican"
          }
      ],
      "rating": 4.5,
      "coordinates": {
          "latitude": 43.66963,
          "longitude": -79.41338
      },
      "transactions": [],
      "price": "$$",
      "location": {
          "address1": "2 Follis Avenue",
          "address2": "",
          "address3": "",
          "city": "Toronto",
          "zip_code": "M6G 1S3",
          "country": "CA",
          "state": "ON",
          "display_address": [
              "2 Follis Avenue",
              "Toronto, ON M6G 1S3",
              "Canada"
          ]
      },
      "phone": "+16477947115",
      "display_phone": "+1 647-794-7115",
      "distance": 599.1600601062186
  },
  {
      "id": "dRjU-uxMeInyYgBb61Ap7A",
      "alias": "itacate-toronto",
      "name": "Itacate",
      "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/u7zjR6MOINR84AYwFFiTCA/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/itacate-toronto?adjust_creative=iqnuEIVEAHVyqp3-szgKBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iqnuEIVEAHVyqp3-szgKBA",
      "review_count": 40,
      "categories": [
          {
              "alias": "mexican",
              "title": "Mexican"
          }
      ],
      "rating": 4.5,
      "coordinates": {
          "latitude": 43.6793908547042,
          "longitude": -79.4371611624956
      },
      "transactions": [],
      "price": "$$",
      "location": {
          "address1": "998 St. Clair Avenue W",
          "address2": null,
          "address3": "",
          "city": "Toronto",
          "zip_code": "M6E 1A2",
          "country": "CA",
          "state": "ON",
          "display_address": [
              "998 St. Clair Avenue W",
              "Toronto, ON M6E 1A2",
              "Canada"
          ]
      },
      "phone": "+16477010420",
      "display_phone": "+1 647-701-0420",
      "distance": 2326.8350548136405
  }
]


console.log("sort by", sortBy(mockSearchData, "review_count", true));