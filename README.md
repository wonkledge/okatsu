# OKATSU : Emphasize domain

​	OKATSU has been created to focus on domain part rather than technical part of an API. It takes an approach from functional programming and try to bring domain into spot light. 

 `feature` function is the core of OKATSU. Through that function you'll be able to express verbosely what your endpoint has to do.



Here an example of implementation with OKATSU framework : [https://github.com/wonkledge/okatsu-api-example]( https://github.com/wonkledge/okatsu-api-example)



**Okatsu has been made to work with Express and Mongoose**

## feature 

​	Resolve every functions from right to left.

##### 	Be careful

​		Last function must be sendResponse otherwise your API will not respond.

##### 	Signature

​		`@wonkledge/okatsu/lib/feature -> ...functions -> input -> Promise`  

##### 	Example

```javascript
const validators = [];
const mapper = [];

//fetchData is a call to a DB

const getAllData = (req, res) => {
  feature(sendResponse(res), mapFields(mapper), query(fetchData), checkParameters(validators))(req)
}
```



## resolved

​	Returns promise resolved with data passed in

##### 	Signature

​		`@wonkledge/okatsu/lib/resolved -> data -> Promise.resolve `

##### 	Example

```javascript
const sum3 = input => resolved(input + 3)
// output : new Promise((resolve) => resolve(data));
```



## rejected

​	Returns promise rejected with data passed in	

##### 	Signature

​		`@wonkledge/okatsu/lib/rejected -> data -> Promise.reject `

##### 	Example

```javascript
const sum3 = input => rejected(input + 3)
// output : new Promise((resolve, reject) => reject(data));
```



## combine

​	Returns an object with type combine and array of functions passed in 

##### 	Signature

​		`@wonkledge/okatsu/lib/combine -> ...functions -> object `

##### 	Example

```javascript
const sum3 = input => input + 3;
const times2 = input => input * 2;

const sum3Times2 = combine(times2, sum3);
//output : { type: combine, combinations: [times2, sum3] }
```



## either

​	Returns an object with type either, left part contains function that'll be call if previous promise is resolved, right part contains function that'll be call if previous promise is rejected

##### 	Signature

​		`@wonkledge/okatsu/lib/either -> (left, right) -> object `

##### 	Example

```javascript
const sum3 = input => input + 3;
const times2 = input => input * 2;

const times2OrSum3 = either(times2, sum3);
//output : { type: either, left: times2, right: sum3 }
```



## checkParameters

​	checkParameters will raise errors if field provided are missing or predicate failed.  *Errors are raised into promise reject.*

​	checkParameters will return params checked into promise resolve.

##### 	Be careful

​		That function must be used inside `feature` function

##### 	Signature

​		`@wonkledge/okatsu/lib/checkParameters -> validators -> params -> Promise.resolved || Promise.rejected `

##### 	Example

```javascript
const validators = [
    {
        field: 'id',
        predicate: id => id.toString().match(/^[0-9]+$/),
        errorMessage: 'id must be integer'
    }
];

checkParameters(validators) // output : Promise resolve with params or Promise reject with error raised
```



## mapFields

##### 	Be careful

​		That function must be used inside `feature` function

##### 	Signature

​		`@wonkledge/okatsu/lib/mapFields -> mapping -> data -> Promise.resolved`

##### 	Example

```javascript
const mapping = [
    {
        source: 'bestSeller',
        target: 'best_seller'
    },
    {
        source: 'sales',
        target: 'sales',
        transform: (sales) => sales > 100000 ? "Damn it, you're famous" : "Who are you ?"
    }
];

mapFields(mapping); //output : Promise resolve with data mapped

```



## sendResponse

##### 	Signature

​		`@wonkledge/okatsu/lib/sendResponse -> res -> either`

##### 	Example	

```javascript
// variable res is given by express to respond.
sendResponse(res) // output : { type: either, left: handleResponse, right: handleErrorResponse } 
```



## query

##### 	Signature

​		`@wonkledge/okatsu/lib/query -> callback -> combine`

##### 	Example

```javascript
// Consider Data is a model of mongoose library
const fetchData = (params) => Data.find();
query(fetchData)
```



## httpResponseWrapper

##### 	Signature

​		`@wonkledge/okatsu/lib/httpResponseWrapper -> (httpCode, payload) -> object`

##### 	Example

```javascript
httpResponseWrapper(HTTP_CODE_500, 'Something bad happen') // output : { code: 500, payload : 'Something bad happen'}
```