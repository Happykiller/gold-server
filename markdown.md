FORMAT: 1A

# JSON Schema
Every request and response can have a schema.


# Group Authentification

## Auth [/auth]

### Sign in [POST]
Sign in to get a secure token.

+ Request (application/json)

    + Body

            {
                "email": "an email"
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string"
                    }
                }
            }

+ Response 200 (application/json)

    + Body

            {
                "success": "true",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSJ9LCJpYXQiOjE1ODE5MzE0MzksImV4cCI6MTU4MTkzNTAzOX0.dA4I1rh0N6Mhqr-a1vBI1SKk8r93ScR1GB_kbBW-lbk"
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "success": {
                        "type": "boolean"
                    },
                    "token": {
                        "type": "string"
                    }
                }
            }

+ Response 401 (application/json)

    + Body

            {
                "message": "Validation failed. Given email and password aren't matching."
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string"
                    }
                }
            }


# Group User

## User [/user/{userId}]

+ Parameters

    + userId: 42 (required) - Unique identifier for a user

### Get user details [GET]
Get details for an user.

+ Response 200 (application/json) OK

    + Body

            {
                "id": 1,
                "firstName": "John",
                "lastName": "Doe",
                "email": "example@example.com",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSJ9LCJpYXQiOjE1ODE5MzE0MzksImV4cCI6MTU4MTkzNTAzOX0.dA4I1rh0N6Mhqr-a1vBI1SKk8r93ScR1GB_kbBW-lbk",
                "createdAt": "2020-02-17T09:23:36.000Z",
                "updatedAt": "2020-02-17T09:23:59.000Z"
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "firstName": {
                        "type": "string"
                    },
                    "lastName": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "token": {
                        "type": "string"
                    },
                    "createdAt": {
                        "type": "string"
                    },
                    "updatedAt": {
                        "type": "string"
                    }
                }
            }

+ Response 400 (application/json)

    + Body

            {
                "message": "Invalid auth token provided."
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string"
                    }
                }
            }


# Group Account

## Account [/account]

### Create an account [POST]
Create an account.

+ Request (application/json)

    + Body

            {
                "label": "a label"
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "label": {
                        "type": "string"
                    }
                }
            }

+ Response 200 (application/json)

    + Body
        {
            "id": 1,
            "label": "test",
            "type": "account.type-regular",
            "active": true,
            "createdAt": "2020-02-17T14:14:52.000Z",
            "updatedAt": "2020-02-17T14:14:52.000Z",
            "creatorId": 1
        }

    + Schema

            {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "label": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "active": {
                        "type": "boolean"
                    },
                    "createdAt": {
                        "type": "dateTime"
                    },
                    "updatedAt": {
                        "type": "dateTime"
                    },
                    "creatorId": {
                        "type": "integer"
                    }
                }
            }

+ Response 401 (application/json)

### [/account/{accountId}]

#### Get account [GET]

+ Parameters

    + accountId: 42 (required) - Unique identifier for a account

+ Response 200 (application/json) OK

    + Body

            {
                "id": 1,
                "label": "test",
                "type": "account.type-regular",
                "active": true,
                "createdAt": "2020-02-17T14:14:52.000Z",
                "updatedAt": "2020-02-17T14:14:52.000Z",
                "creatorId": 1
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "label": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "active": {
                        "type": "boolean"
                    },
                    "createdAt": {
                        "type": "dateTime"
                    },
                    "updatedAt": {
                        "type": "dateTime"
                    },
                    "creatorId": {
                        "type": "integer"
                    }
                }
            }

+ Response 400 (application/json)

    + Body

            {
                "message": "Invalid auth token provided."
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string"
                    }
                }
            }

#### Delete account [DELETE]

+ Parameters

    + accountId: 42 (required) - Unique identifier for a account

+ Response 200 (application/json) OK

    + Body

            [
                1
            ]

    + Schema

            {
                "type": "array"
            }

+ Response 400 (application/json)

    + Body

            {
                "message": "Invalid auth token provided."
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string"
                    }
                }
            }

# Group Category

## Category [/category]

### Create an category [POST]
Create an category.

+ Request (application/json)

    + Body

            {
                "label": "a label",
                "description": "a description"
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "label": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    }
                }
            }

+ Response 200 (application/json)

    + Body
        {
            "id": 1,
            "label": "label",
            "description": "description",
            "active": true,
            "createdAt": "2020-02-17T14:14:52.000Z",
            "updatedAt": "2020-02-17T14:14:52.000Z",
            "creatorId": 1
        }

    + Schema

            {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "label": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    },
                    "active": {
                        "type": "boolean"
                    },
                    "createdAt": {
                        "type": "dateTime"
                    },
                    "updatedAt": {
                        "type": "dateTime"
                    },
                    "creatorId": {
                        "type": "integer"
                    }
                }
            }

+ Response 401 (application/json)

### [/category/{categoryId}]

#### Get category [GET]

+ Parameters

    + categoryId: 42 (required) - Unique identifier for a category

+ Response 200 (application/json) OK

    + Body

            {
                "id": 1,
                "label": "label",
                "description": "description",
                "active": true,
                "createdAt": "2020-02-17T14:14:52.000Z",
                "updatedAt": "2020-02-17T14:14:52.000Z",
                "creatorId": 1
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "label": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    },
                    "active": {
                        "type": "boolean"
                    },
                    "createdAt": {
                        "type": "dateTime"
                    },
                    "updatedAt": {
                        "type": "dateTime"
                    },
                    "creatorId": {
                        "type": "integer"
                    }
                }
            }

+ Response 400 (application/json)

    + Body

            {
                "message": "Invalid auth token provided."
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string"
                    }
                }
            }

#### Delete category [DELETE]

+ Parameters

    + categoryId: 42 (required) - Unique identifier for a category

+ Response 200 (application/json) OK

    + Body

            [
                1
            ]

    + Schema

            {
                "type": "array"
            }

+ Response 400 (application/json)

    + Body

            {
                "message": "Invalid auth token provided."
            }

    + Schema

            {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string"
                    }
                }
            }