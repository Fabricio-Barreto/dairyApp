# dairyApp

API endpoints summary
Route             | Method   | Description
------------------|----------|--------------------
/users            | POST     | Create User
/users/login      | POST     | Login User
/users/logout     | POST     | Logout User
/users/logoutALL  | POST     | Logout All User
/users/me/avatar  | POST     | Upload an image for Authenticated User
/users/me         | GET      | Read Authenticated User
/users/:id/avatar | GET      | Read image for User id
/users/me         | DELETE   | Delete Authenticated User

### POST https://plancto-diaryapp.herokuapp.com/users

##### HTTP Request Body Example
    
    {
    "name": "Aline",
    "email": "aline@email.com",
    "password": "Re3we322s"
    "age": "23" (age is optional, default age is 0.)
    }
    

##### HTTP Response Body Example

     {
        "user": {
            "name": "Aline",
            "email": "aline@email.com",
            "age": "23",
            "_id": "6271c681f5650aa6d806b919",
            "createdAt": "2022-05-04T00:19:13.318Z",
            "updatedAt": "2022-05-04T00:19:13.318Z",
            "__v": 0
        },
        "token": {}
    }

### POST https://plancto-diaryapp.herokuapp.com/users/login

##### HTTP Request Body Example

    {
        "user": "aline@email.com",
        "password": "Re3we322s"
    }
    
##### HTTP Response Body Example

    {
        "user": {
            "_id": "6271b220df0d7798cb148a66",
            "name": "Aline",
            "email": "aline@email.com",
            "age": 0,
            "createdAt": "2022-05-03T22:52:16.697Z",
            "updatedAt": "2022-05-04T00:20:16.928Z",
            "__v": 76
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjcxYjIyMGRmMGQ3Nzk4Y2IxNDhhNjYiLCJpYXQiOjE2NTE2MjM2MTZ9.Fw30XHUzfkpRfJVqWXI2y1bf_KEGRdbnJpkMg-h_iJM"
    }
    
### POST https://plancto-diaryapp.herokuapp.com/users/logout

##### HTTP Request Body Example
N/A

##### HTTP Response Body Example
N/A, status 200.

### POST https://plancto-diaryapp.herokuapp.com/users/logoutALL

##### HTTP Request Body Example
N/A

##### HTTP Response Body Example
N/A, status 200.

### POST https://plancto-diaryapp.herokuapp.com/users/me/avatar 

##### HTTP Request Body Example
form-data with avatar as a key.

![image](https://user-images.githubusercontent.com/63824002/166606458-6e2cd2bc-b582-4d3f-8ce1-fbf81e38f3bf.png)

##### HTTP Response Body Example
N/A, status 200.

### GET https://plancto-diaryapp.herokuapp.com/users/me   

##### HTTP Request Body Example
N/A

##### HTTP Response Body Example

    {
        "_id": "6271b220df0d7798cb148a66",
        "name": "Aline",
        "email": "aline@email.com",
        "age": 0,
        "createdAt": "2022-05-03T22:52:16.697Z",
        "updatedAt": "2022-05-04T00:26:35.813Z",
        "__v": 78
    }
    
### GET https://plancto-diaryapp.herokuapp.com/users/6271b220df0d7798cb148a66/avatar  

##### HTTP Request Body Example
N/A

##### HTTP Response Body Example

![image](https://user-images.githubusercontent.com/63824002/166608168-295ce80e-19ef-40bf-b016-266c8b4f3bdf.png)


### DELETE https://plancto-diaryapp.herokuapp.com/users/me 

##### HTTP Request Body Example
N/A

##### HTTP Response Body Example

{
    "_id": "6271b220df0d7798cb148a66",
    "name": "Aline",
    "email": "aline@email.com",
    "age": 0,
    "createdAt": "2022-05-03T22:52:16.697Z",
    "updatedAt": "2022-05-04T00:41:47.632Z",
    "__v": 84
}
