const data = [
    { "_id": "661276b4fc13ae7fe5ab9161", "name": "potatoes", "description": "superior", "price": 925, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9162" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9163" }, "quantity": 37, "shipping": true, "organic": true, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9164", "name": "chicken", "description": "outstanding", "price": 452, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9165" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9166" }, "quantity": 34, "shipping": true, "organic": false, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9167", "name": "chicken", "description": "outstanding", "price": 752, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9168" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9169" }, "quantity": 29, "shipping": false, "organic": false, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab916a", "name": "milk", "description": "poor", "price": 1093, "sellerId": { "$oid": "661276b4fc13ae7fe5ab916b" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab916c" }, "quantity": 95, "shipping": true, "organic": true, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab916d", "name": "apples", "description": "superior", "price": 1577, "sellerId": { "$oid": "661276b4fc13ae7fe5ab916e" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab916f" }, "quantity": 39, "shipping": false, "organic": false, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9170", "name": "milk", "description": "superior", "price": 594, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9171" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9172" }, "quantity": 94, "shipping": true, "organic": false, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9173", "name": "chicken", "description": "superior", "price": 86, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9174" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9175" }, "quantity": 45, "shipping": true, "organic": true, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9176", "name": "pumpkins", "description": "exceptional", "price": 173, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9177" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9178" }, "quantity": 55, "shipping": true, "organic": true, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9179", "name": "eggs", "description": "average", "price": 1842, "sellerId": { "$oid": "661276b4fc13ae7fe5ab917a" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab917b" }, "quantity": 63, "shipping": true, "organic": true, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab917c", "name": "potatoes", "description": "average", "price": 593, "sellerId": { "$oid": "661276b4fc13ae7fe5ab917d" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab917e" }, "quantity": 7, "shipping": false, "organic": false, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab917f", "name": "potatoes", "description": "excellent", "price": 69, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9180" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9181" }, "quantity": 77, "shipping": true, "organic": false, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9182", "name": "apples", "description": "average", "price": 346, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9183" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9184" }, "quantity": 65, "shipping": false, "organic": false, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9185", "name": "eggs", "description": "poor", "price": 106, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9186" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9187" }, "quantity": 66, "shipping": true, "organic": true, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9188", "name": "potatoes", "description": "subpar", "price": 1019, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9189" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab918a" }, "quantity": 56, "shipping": false, "organic": false, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab918b", "name": "eggs", "description": "fair", "price": 45, "sellerId": { "$oid": "661276b4fc13ae7fe5ab918c" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab918d" }, "quantity": 99, "shipping": false, "organic": true, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab918e", "name": "carrots", "description": "good", "price": 1696, "sellerId": { "$oid": "661276b4fc13ae7fe5ab918f" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9190" }, "quantity": 80, "shipping": true, "organic": true, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9191", "name": "pumpkins", "description": "outstanding", "price": 1404, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9192" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9193" }, "quantity": 85, "shipping": false, "organic": true, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9194", "name": "strawberries", "description": "subpar", "price": 391, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9195" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9196" }, "quantity": 30, "shipping": true, "organic": true, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9197", "name": "chicken", "description": "fair", "price": 223, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9198" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9199" }, "quantity": 28, "shipping": false, "organic": true, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab919a", "name": "carrots", "description": "poor", "price": 1955, "sellerId": { "$oid": "661276b4fc13ae7fe5ab919b" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab919c" }, "quantity": 40, "shipping": true, "organic": true, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab919d", "name": "potatoes", "description": "superior", "price": 1399, "sellerId": { "$oid": "661276b4fc13ae7fe5ab919e" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab919f" }, "quantity": 45, "shipping": false, "organic": true, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91a0", "name": "strawberries", "description": "superior", "price": 814, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91a1" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91a2" }, "quantity": 54, "shipping": true, "organic": false, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91a3", "name": "eggs", "description": "excellent", "price": 863, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91a4" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91a5" }, "quantity": 38, "shipping": false, "organic": true, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91a6", "name": "carrots", "description": "exceptional", "price": 904, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91a7" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91a8" }, "quantity": 83, "shipping": false, "organic": true, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91a9", "name": "eggs", "description": "subpar", "price": 311, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91aa" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91ab" }, "quantity": 11, "shipping": true, "organic": false, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91ac", "name": "pumpkins", "description": "subpar", "price": 1899, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91ad" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91ae" }, "quantity": 77, "shipping": false, "organic": false, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91af", "name": "strawberries", "description": "good", "price": 613, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91b0" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91b1" }, "quantity": 5, "shipping": false, "organic": true, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91b2", "name": "eggs", "description": "exceptional", "price": 1345, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91b3" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91b4" }, "quantity": 74, "shipping": false, "organic": true, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91b5", "name": "pumpkins", "description": "mediocre", "price": 892, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91b6" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91b7" }, "quantity": 46, "shipping": false, "organic": false, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91b8", "name": "potatoes", "description": "outstanding", "price": 1566, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91b9" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91ba" }, "quantity": 83, "shipping": false, "organic": true, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91bb", "name": "honey", "description": "average", "price": 747, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91bc" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91bd" }, "quantity": 18, "shipping": false, "organic": true, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91be", "name": "potatoes", "description": "average", "price": 913, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91bf" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91c0" }, "quantity": 56, "shipping": false, "organic": true, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91c1", "name": "potatoes", "description": "subpar", "price": 1444, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91c2" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91c3" }, "quantity": 41, "shipping": true, "organic": true, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91c4", "name": "milk", "description": "fair", "price": 575, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91c5" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91c6" }, "quantity": 93, "shipping": false, "organic": true, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91c7", "name": "milk", "description": "subpar", "price": 1310, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91c8" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91c9" }, "quantity": 61, "shipping": false, "organic": true, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91ca", "name": "chicken", "description": "superior", "price": 1130, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91cb" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91cc" }, "quantity": 39, "shipping": false, "organic": true, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91cd", "name": "milk", "description": "mediocre", "price": 977, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91ce" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91cf" }, "quantity": 80, "shipping": false, "organic": false, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91d0", "name": "chicken", "description": "outstanding", "price": 1922, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91d1" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91d2" }, "quantity": 72, "shipping": true, "organic": false, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91d3", "name": "honey", "description": "fair", "price": 1705, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91d4" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91d5" }, "quantity": 23, "shipping": true, "organic": false, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91d6", "name": "corn", "description": "superior", "price": 1002, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91d7" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91d8" }, "quantity": 39, "shipping": true, "organic": true, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91d9", "name": "honey", "description": "subpar", "price": 1092, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91da" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91db" }, "quantity": 20, "shipping": false, "organic": true, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91dc", "name": "honey", "description": "poor", "price": 1972, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91dd" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91de" }, "quantity": 32, "shipping": false, "organic": false, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91df", "name": "chicken", "description": "poor", "price": 1439, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91e0" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91e1" }, "quantity": 83, "shipping": false, "organic": true, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91e2", "name": "apples", "description": "exceptional", "price": 2000, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91e3" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91e4" }, "quantity": 85, "shipping": true, "organic": false, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91e5", "name": "apples", "description": "excellent", "price": 847, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91e6" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91e7" }, "quantity": 52, "shipping": true, "organic": true, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91e8", "name": "strawberries", "description": "mediocre", "price": 451, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91e9" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91ea" }, "quantity": 63, "shipping": false, "organic": false, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91eb", "name": "potatoes", "description": "exceptional", "price": 1458, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91ec" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91ed" }, "quantity": 43, "shipping": false, "organic": false, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91ee", "name": "chicken", "description": "good", "price": 438, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91ef" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91f0" }, "quantity": 55, "shipping": true, "organic": true, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91f1", "name": "honey", "description": "mediocre", "price": 1579, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91f2" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91f3" }, "quantity": 77, "shipping": true, "organic": false, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91f4", "name": "apples", "description": "excellent", "price": 1208, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91f5" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91f6" }, "quantity": 36, "shipping": true, "organic": true, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91f7", "name": "corn", "description": "average", "price": 667, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91f8" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91f9" }, "quantity": 71, "shipping": true, "organic": true, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91fa", "name": "strawberries", "description": "average", "price": 1661, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91fb" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91fc" }, "quantity": 59, "shipping": false, "organic": false, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab91fd", "name": "eggs", "description": "fair", "price": 34, "sellerId": { "$oid": "661276b4fc13ae7fe5ab91fe" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab91ff" }, "quantity": 31, "shipping": true, "organic": false, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9200", "name": "honey", "description": "good", "price": 43, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9201" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9202" }, "quantity": 13, "shipping": true, "organic": false, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9203", "name": "pumpkins", "description": "subpar", "price": 660, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9204" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9205" }, "quantity": 37, "shipping": true, "organic": false, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9206", "name": "carrots", "description": "superior", "price": 1357, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9207" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9208" }, "quantity": 90, "shipping": true, "organic": false, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9209", "name": "pumpkins", "description": "mediocre", "price": 308, "sellerId": { "$oid": "661276b4fc13ae7fe5ab920a" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab920b" }, "quantity": 22, "shipping": false, "organic": true, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab920c", "name": "honey", "description": "good", "price": 1759, "sellerId": { "$oid": "661276b4fc13ae7fe5ab920d" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab920e" }, "quantity": 83, "shipping": false, "organic": true, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab920f", "name": "apples", "description": "average", "price": 264, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9210" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9211" }, "quantity": 67, "shipping": false, "organic": true, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9212", "name": "potatoes", "description": "mediocre", "price": 290, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9213" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9214" }, "quantity": 24, "shipping": false, "organic": true, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9215", "name": "chicken", "description": "mediocre", "price": 397, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9216" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9217" }, "quantity": 14, "shipping": false, "organic": true, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9218", "name": "honey", "description": "superior", "price": 1099, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9219" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab921a" }, "quantity": 57, "shipping": false, "organic": false, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab921b", "name": "milk", "description": "fair", "price": 736, "sellerId": { "$oid": "661276b4fc13ae7fe5ab921c" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab921d" }, "quantity": 43, "shipping": true, "organic": true, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab921e", "name": "corn", "description": "mediocre", "price": 79, "sellerId": { "$oid": "661276b4fc13ae7fe5ab921f" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9220" }, "quantity": 5, "shipping": false, "organic": false, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9221", "name": "chicken", "description": "mediocre", "price": 1427, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9222" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9223" }, "quantity": 33, "shipping": false, "organic": true, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9224", "name": "eggs", "description": "exceptional", "price": 230, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9225" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9226" }, "quantity": 50, "shipping": true, "organic": true, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9227", "name": "strawberries", "description": "fair", "price": 1903, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9228" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9229" }, "quantity": 37, "shipping": false, "organic": false, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab922a", "name": "corn", "description": "exceptional", "price": 957, "sellerId": { "$oid": "661276b4fc13ae7fe5ab922b" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab922c" }, "quantity": 5, "shipping": true, "organic": false, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab922d", "name": "strawberries", "description": "good", "price": 1704, "sellerId": { "$oid": "661276b4fc13ae7fe5ab922e" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab922f" }, "quantity": 97, "shipping": true, "organic": false, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9230", "name": "chicken", "description": "exceptional", "price": 1495, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9231" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9232" }, "quantity": 87, "shipping": false, "organic": false, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9233", "name": "milk", "description": "excellent", "price": 1447, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9234" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9235" }, "quantity": 96, "shipping": false, "organic": false, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9236", "name": "pumpkins", "description": "subpar", "price": 1698, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9237" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9238" }, "quantity": 19, "shipping": true, "organic": true, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9239", "name": "potatoes", "description": "average", "price": 1988, "sellerId": { "$oid": "661276b4fc13ae7fe5ab923a" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab923b" }, "quantity": 81, "shipping": true, "organic": false, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab923c", "name": "eggs", "description": "subpar", "price": 1024, "sellerId": { "$oid": "661276b4fc13ae7fe5ab923d" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab923e" }, "quantity": 22, "shipping": true, "organic": true, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab923f", "name": "apples", "description": "exceptional", "price": 1125, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9240" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9241" }, "quantity": 70, "shipping": false, "organic": false, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9242", "name": "strawberries", "description": "mediocre", "price": 61, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9243" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9244" }, "quantity": 41, "shipping": false, "organic": false, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9245", "name": "corn", "description": "mediocre", "price": 842, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9246" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9247" }, "quantity": 21, "shipping": true, "organic": false, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9248", "name": "chicken", "description": "subpar", "price": 223, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9249" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab924a" }, "quantity": 23, "shipping": false, "organic": false, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab924b", "name": "carrots", "description": "outstanding", "price": 664, "sellerId": { "$oid": "661276b4fc13ae7fe5ab924c" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab924d" }, "quantity": 52, "shipping": true, "organic": false, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab924e", "name": "chicken", "description": "outstanding", "price": 1884, "sellerId": { "$oid": "661276b4fc13ae7fe5ab924f" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9250" }, "quantity": 89, "shipping": true, "organic": true, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9251", "name": "apples", "description": "poor", "price": 196, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9252" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9253" }, "quantity": 97, "shipping": false, "organic": true, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9254", "name": "carrots", "description": "fair", "price": 1443, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9255" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9256" }, "quantity": 72, "shipping": true, "organic": true, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9257", "name": "potatoes", "description": "outstanding", "price": 435, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9258" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9259" }, "quantity": 64, "shipping": true, "organic": false, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab925a", "name": "strawberries", "description": "average", "price": 1870, "sellerId": { "$oid": "661276b4fc13ae7fe5ab925b" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab925c" }, "quantity": 29, "shipping": true, "organic": false, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab925d", "name": "milk", "description": "outstanding", "price": 486, "sellerId": { "$oid": "661276b4fc13ae7fe5ab925e" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab925f" }, "quantity": 93, "shipping": false, "organic": true, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9260", "name": "strawberries", "description": "exceptional", "price": 907, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9261" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9262" }, "quantity": 22, "shipping": false, "organic": true, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9263", "name": "chicken", "description": "superior", "price": 590, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9264" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9265" }, "quantity": 60, "shipping": true, "organic": false, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9266", "name": "honey", "description": "exceptional", "price": 1423, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9267" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9268" }, "quantity": 59, "shipping": true, "organic": false, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9269", "name": "eggs", "description": "mediocre", "price": 1492, "sellerId": { "$oid": "661276b4fc13ae7fe5ab926a" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab926b" }, "quantity": 91, "shipping": false, "organic": false, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab926c", "name": "eggs", "description": "outstanding", "price": 564, "sellerId": { "$oid": "661276b4fc13ae7fe5ab926d" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab926e" }, "quantity": 97, "shipping": true, "organic": false, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab926f", "name": "strawberries", "description": "excellent", "price": 141, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9270" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9271" }, "quantity": 29, "shipping": false, "organic": false, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9272", "name": "strawberries", "description": "average", "price": 431, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9273" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9274" }, "quantity": 93, "shipping": true, "organic": false, "quality": 2, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9275", "name": "honey", "description": "excellent", "price": 1154, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9276" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9277" }, "quantity": 74, "shipping": true, "organic": true, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9278", "name": "eggs", "description": "outstanding", "price": 560, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9279" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab927a" }, "quantity": 83, "shipping": true, "organic": false, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab927b", "name": "potatoes", "description": "fair", "price": 1390, "sellerId": { "$oid": "661276b4fc13ae7fe5ab927c" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab927d" }, "quantity": 8, "shipping": false, "organic": true, "quality": 1, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab927e", "name": "pumpkins", "description": "outstanding", "price": 1335, "sellerId": { "$oid": "661276b4fc13ae7fe5ab927f" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9280" }, "quantity": 54, "shipping": true, "organic": true, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9281", "name": "pumpkins", "description": "outstanding", "price": 1201, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9282" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9283" }, "quantity": 51, "shipping": false, "organic": false, "quality": 4, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9284", "name": "corn", "description": "poor", "price": 1862, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9285" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9286" }, "quantity": 93, "shipping": false, "organic": true, "quality": 3, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab9287", "name": "potatoes", "description": "superior", "price": 1804, "sellerId": { "$oid": "661276b4fc13ae7fe5ab9288" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab9289" }, "quantity": 50, "shipping": false, "organic": false, "quality": 5, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" },
    { "_id": "661276b4fc13ae7fe5ab928a", "name": "chicken", "description": "outstanding", "price": 178, "sellerId": { "$oid": "661276b4fc13ae7fe5ab928b" }, "commodityId": { "$oid": "661276b4fc13ae7fe5ab928c" }, "quantity": 34, "shipping": true, "organic": false, "quality": 0, "quantityUnit": "bag", "availableDate": "5/4/2024", "createdAt": "4/2/2024 00:00:00", "updatedAt": "4/2/2024 00:00:00" }
]


export default data;