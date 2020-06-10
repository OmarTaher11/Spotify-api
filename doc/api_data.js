import { Mongoose } from "mongoose";
import { ObjectID } from "mongodb";

define({ "api": [
  {
    "type": "post",
    "url": "//users/uploadprofile",
    "title": "uploading profile picture",
    "name": "Get/_uploading_profile_picture",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          },
          {
            "group": "Parameter",
            "type": "buffer",
            "optional": false,
            "field": "file",
            "description": "<p>the image</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n\"message: uploaded\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/ChangerPassword",
    "title": "changing the password to a new one",
    "name": "Get/changing_the_password_to_a_new_one",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>the user email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>the current password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>the new password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n    \"emailConfirmation\": true,\n    \"_id\": \"5edf1b9eea12804f8ca04a69\",\n    \"display_name\": \"omar\",\n    \"email\": \"omar_taher2012@yahoo.com\",\n    \"product\": \"premium\",\n    \"type\": \"user\",\n    \"__v\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "//users/me",
    "title": "deleting my account",
    "name": "Get/deleting_my_account",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n\"message deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/deleteprofile",
    "title": "deleting profile picture",
    "name": "Get/get_deleting_profile_picture",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n\"message deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/me",
    "title": "updating the user info",
    "name": "Get/get_updating_the_user_info",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "display_name",
            "description": "<p>the new name (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "age",
            "description": "<p>the updated age (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>new type (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>new country (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n    \"message\":updated\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "Get",
    "url": "/users/:_id",
    "title": "get user info",
    "name": "Get/get_user_info",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n    \"user\": {\n        \"emailConfirmation\": true,\n        \"_id\": \"5edf1b9eea12804f8ca04a69\",\n        \"display_name\": \"omar\",\n        \"email\": \"omar_taher2012@yahoo.com\",\n        \"product\": \"premium\",\n        \"type\": \"user\",\n        \"__v\": 1\n    },\n    \"followers\": 0,\n    \"following\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "Get",
    "url": "/me",
    "title": "get user info",
    "name": "Get/get_user_info",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n    \"user\": {\n        \"emailConfirmation\": true,\n        \"_id\": \"5edf1b9eea12804f8ca04a69\",\n        \"display_name\": \"omar\",\n        \"email\": \"omar_taher2012@yahoo.com\",\n        \"product\": \"premium\",\n        \"type\": \"user\",\n        \"__v\": 1\n    },\n    \"followers\": 0,\n    \"following\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "login the website",
    "name": "Get/login_the_website",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>the user email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>the user password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains message and userid and authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n    \"message\": \"login successfully\",\n    \"userId\": \"5edf1b9eea12804f8ca04a69\",\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRmMWI5ZWVhMTI4MDRmOGNhMDRhNjkiLCJpYXQiOjE1OTE2Nzk5MjB9.28oUgpp06l1vzfmWwpvYBeT-wr517nQZva2Y4WsNS-A\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n\"Message\":\"unable to login\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/Signout",
    "title": "loginout the website",
    "name": "Get/loginout_the_website",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n    \"message\": \"loginout successfully\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n\"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/forgotPassword",
    "title": "request email to enter new password",
    "name": "Get/request_email_to_enter_new_password",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>the user email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n    \"message\": \"email sent\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/upgrade",
    "title": "request email to upgrade to premium",
    "name": "Get/request_email_to_upgrade_to_premium",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n\"message\": email sent\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/profile/:id",
    "title": "requesting the image",
    "name": "Get/requesting_the_image",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n 'img data'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/signUp",
    "title": "signing up",
    "name": "Get/signing_up",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>the user email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "display_name",
            "description": "<p>the user email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>the password</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "age",
            "description": "<p>age of the user (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>country of the user (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product",
            "description": "<p>subscribtion type premium or free</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>user or artist</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 201 ",
          "content": "HTTP/1.1 201 \n{\n    \"message\": \"please verify your email\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"email is invalid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/me/following",
    "title": "follow somone",
    "name": "Get/follow_somone",
    "group": "follow",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ids",
            "description": "<p>array of ids to be followed</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n  message: followed\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/follower.js",
    "groupTitle": "follow"
  },
  {
    "type": "Get",
    "url": "/me/following/contains",
    "title": "get following status",
    "name": "Get/get_following_status",
    "group": "follow",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ids",
            "description": "<p>array of ids to be checked</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n  message: not followed\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\n \"Message\":\"user isn't authorized\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/follower.js",
    "groupTitle": "follow"
  },
  
  
  {
    "type": "Get",
    "url": "/me/following",
    "title": "get people i follow",
    "name": "Get/get_people_i_follow",
    "group": "follow",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          },{
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n[\n    {\n        \"_id\":\"sadsfgfhgdfssdfghghjhgfd\",\n        \"follower\":{\n            \"_id\":\"asdfghjkjhgfdsaSDFGHJ\",\n            \"display_name\":\"omar\",\n            \"email\":\"omar@yahoo.com\",\n            \"country\":\"egypt\",\n            \"product\":\"premium\",\n            \"type\":\"free\",\n            \"__v\":1\n        }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\nmessage: \"faild to complete the process\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/follower.js",
    "groupTitle": "follow"
  },
  {
    "type": "delete",
    "url": "/me/unfollow",
    "title": "unfollow people",
    "name": "Get/unfollow_people",
    "group": "follow",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ids",
            "description": "<p>array of ids to be unfollowed</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n{\n    \"message\": succeed\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\nmessage: \"faild to complete the process\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/follower.js",
    "groupTitle": "follow"
  },
  /////////////////////////////////////////////////////
  {
    "type":"Post",
    "url": "/artist",
    "title": "Add Album",
    "name": "Post/Add_Album",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "album_type",
            "description": "<p>album type</p>"
          },
          {
            "group": "Parameter",
            "type": ObjectId,
            "optional": true,
            "field": "artists",
            "description": "<p>album artists</p>"
          },
          {
            "group": "Parameter",
            "type": ObjectId ,
            "optional": true,
            "field": "copyrights",
            "description": "<p>the album's copyrights</p>"
          },
          {
            "group": "Parameter",
            "type": [{
              "item":{
                "type":"String"
              }
            }],
            "optional": true,
            "field": "genres",
            "description": "<p>the album's genres</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "href",
            "description": "<p>the album's href</p>" 
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "genre",
            "description": "<p>the track genre/p>"
          },
          {
            "group": "Parameter",
            "type": Buffer,
            "optional": true,
            "field": "image",
            "description": "<p>the album image</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the album name</p>"
          },
          {
            "group": "Parameter",
            "type": Number,
            "optional": true,
            "field": "popularity",
            "description": "<p>the album's popularity</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "release_date",
            "description": "<p>the album's release date</p>"
          },
          {
            "group": "Parameter",
            "type": [{
              "item":{
                "type": ObjectId
              }
            }

            ],
            "optional": true,
            "field": "tracks",
            "description": "<p>the album tracks</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type",
            "description": "<p>the album type</p>"
          }
          
        ]
      }
    },
    "version": "0.1.0",
    "success":{
      "fields":{
        "Success 200":[
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },{
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains album info</p>"
          }

        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains album info</p>"
          }
        ]
      },     
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n {\n        \"_id\":\"sadsfgfhgdfssdfghghjhgfd\",\n             \"name\":\"Darth Vader\",\n            \"album_type\":\"Jazz\",\n            \"artists\":\[]\,\n         \"copyrights\":\[]\,\n      \"genres\":\[]\,\n               \"tracks\":\[]\,\n       \"__v\":12\n        }\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 ",
          "content": "HTTP/1.1 404 \n{\n\"success\":\false\,\n \"Message\": \"faild to complete the process\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/artist.js",
    "groupTitle": "user"
     
  },
  {
    "type":"Post",
    "url": "/artist/newtrack",
    "title": "Add Track",
    "name": "Post/add_track",
    "group": "user",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": Number,
            "optional": true,
            "field": "disco_no",
            "description": "<p>track disco no</p>"
          },
          {
            "group": "Parameter",
            "type": Number,
            "optional": true,
            "field": "duration",
            "description": "<p>track duration</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the track's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type",
            "description": "<p>the track type</p>"
          },
          {
            "group": "Parameter",
            "type": Number,
            "optional": true,
            "field": "track_number",
            "description": "<p>the track number</p>" 
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "genre",
            "description": "<p>the track genre/p>"
          },
          {
            "group": "Parameter",
            "type": ObjectId,
            "optional": true,
            "field": "album",
            "description": "<p>the track album</p>"
          }
          
        ]
      }
    },
    "success":{
      "fields":{
        "Success 200":[
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },{
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains track info</p>"
          }

        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains track info</p>"
          }
        ]
      },     
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n   {\n                \"_id\":\"5ed3de4ece405309f40a0cd0\",\n            \"disc_no\":\3\,\n            \"duration\":\3\,\n            \"name\":\"Honesty\",\n            \"href\":\"https://www.spotify.com/watch?v=wXhMqDotfLk&list=RDwXhMqDotfLk&start_radio=1\",\n            \"type\":\"Pop\",\n     \"track_number\":\3\,\n      \"album\":\"5ed3cf6440dfa136b869631c\",\n \"artists\":\[]\,\n   \"__v\":1\n        }\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 ",
          "content": "HTTP/1.1 400 \n{\n \"success\": \false\,\n \"Message\": \"There is no album with this id\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/artist.js",
    "groupTitle": "user"

  },
  {
    "type":"Delete",
    "url": "/artists/:id",
    "title": "Delete Album",
    "name": "Delete/delete_album",
    "group": "user",
    "version": "0.1.0",
    "success":{
      "fields":{
        "Success 200":[
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },{
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the status of operation</p>"
          }

        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the status of operation</p>"
          }
        ]
      },     
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n[\n    {\n        \"success\":\"true\",\n                                     \"Message\":\"Album was successfully removed\",\n        }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\nmessage: \"There is no album with this id\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/artist.js",
    "groupTitle": "user"
  },
  {
    "type":"Delete",
    "url": "/artist/:id",
    "title": "Delete a track",
    "name": "Delete/delete_track",
    "group": "user",
    "version": "0.1.0",
    "success":{
      "fields":{
        "Success 200":[
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },{
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the status of operation</p>"
          }

        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the status of operation</p>"
          }
        ]
      },     
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n[\n    {\n        \"success\":\"true\",\n                                     \"Message\":\"Track was removed successfully\",\n        }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\nmessage: \"There is no track with this id\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/artist.js",
    "groupTitle": "artist"
  },
  {
    "type":"Put",
    "url": "/artistalbum/:id",
    "title": "Edit album",
    "name": "Put/edit_album",
    "group": "user",
    "version": "0.1.0",
    "success":{
      "fields":{
        "Success 200":[
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },{
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains album after edit</p>"
          }

        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the status of operation</p>"
          }
        ]
      },     
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n    {\n        \"_id\":\"sadsfgfhgdfssdfghghjhgfd\",\n        \"album\":{\n            \"_id\":\"asdfghjkjhgfdsaSDFGHJ\",\n            \"name\":\"Darth Vader\",\n            \"album_type\":\"Jazz\",\n            \"artists\":\[]\,\n         \"copyrights\":\[]\,\n      \"genres\":\[]\,\n               \"tracks\":\[]\,\n       \"__v\":12\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n{\nmessage: \"There is no album with this id\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/artist.js",
    "groupTitle": "user"
  },
  {
    "type":"Put",
    "url": "/artist/:id",
    "title": "Edit track",
    "name": "Put/edit_track",
    "group": "user",
    "version": "0.1.0",
    "success":{
      "fields":{
        "Success 200":[
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },{
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains album after edit</p>"
          }

        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the status of operation</p>"
          }
        ]
      },     
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n    {\n        \"_id\":\"5ed3de4ece405309f40a0cd0\",\n        \"track\":{\n            \"_id\":\"5ed3de4ece405309f40a0cd0\",\n            \"disc_no\":\3\,\n            \"duration\":\3\,\n            \"name\":\"Honesty\",\n         \"href\":\"https://www.youtube.com/watch?v=wXhMqDotfLk&list=RDwXhMqDotfLk&start_radio=1\",\n      \"type\":\"Pop\",\n               \"track_number\":\3\,\n       \"__v\":1\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 ",
          "content": "HTTP/1.1 404 \n {\n \"success\":\false\,\n \"Message\": \"There is no track with this id\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/artist.js",
    "groupTitle": "artist"
  },
  {
    "type":"Put",
    "url": "/artist/:id/:id2",
    "title": "Add a track to an album",
    "name": "Put/add_a_track_to_an_album",
    "group": "user",
    "version": "0.1.0",
    "success":{
      "fields":{
        "Success 200":[
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },{
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains album after edit</p>"
          }

        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the status of operation</p>"
          }
        ]
      },     
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n    {\n        \"success\":\true\,\n                   \"Message\":\"Track successfully added\"\n        }\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 400 ",
          "content": "HTTP/1.1 400 \n {\n \"success\":\false\,\n \"Message\": \"Track already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/artist.js",
    "groupTitle": "user"
  },
  {
    "type":"Put",
    "url": "/artist/:id/:id2",
    "title": "Remove Track from Album",
    "name": "Put/remove_a_track_to_an_album",
    "group": "user",
    "version": "0.1.0",
    "success":{
      "fields":{
        "Success 200":[
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },{
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains status of operation</p>"
          }

        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the status of operation</p>"
          }
        ]
      },     
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n    {\n        \"success\":\true\,\n                   \"Message\":\"Successfully removed\"\n        }\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 ",
          "content": "HTTP/1.1 404 \n {\n \"success\":\false\,\n \"Message\": \"Can't find album\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/artist.js",
    "groupTitle": "user"
  },
  {
    "type":"Get",
    "url": "/audioplayer",
    "title": "Show tracks by genres",
    "name": "Get/show_tracks_by_genres",
    "group": "track",
    "version": "0.1.0",
    "success":{
      "fields":{
        "Success 200":[
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },{
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the tracks with this genre</p>"
          }

        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the tracks with this genre</p>"
          }
        ]
      },     
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n   [\n {\n \"_id\":\"5edf9ae8ac8ee42eb882ccb7\",\n \"disc_no\":\3\,\n \"duration\":\3\,\n \"name\":\"Beautiful\"\,\n \"href\":\"https://www.youtube.com/watch?v=fdxfemd2edQ\",\n \"type\":\"Folk\",\n \"track_number\":\3\,\n \"genre\": \"Indie\",\n \"artists\": \[]\,\n \"__v\": \0\,\n },\n ]\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 ",
          "content": "HTTP/1.1 404 \n {\n \"success\":\false\,\n \"Message\": \"No tracks found for this genre\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/audioplayer.js",
    "groupTitle": "playlist"
  },
  {
    "type":"Put",
    "url": "/playlistmanager/:id/:id2",
    "title": "Add track to a playlist",
    "name": "Put/add_track_to_a_playlist",
    "group": "playlist",
    "version": "0.1.0",
    "success":{
      "fields":{
        "Success 200":[
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },{
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the status of the operation</p>"
          }

        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the status of the operation</p>"
          }
        ]
      },     
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n    {\n \"sucess\":\true\,\n \"Message\":\"Track is added to playlist successfully\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 ",
          "content": "HTTP/1.1 404 \n {\n \"success\":\false\,\n \"Message\": \"This track doesn't exist create one first\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/playlistmanager.js",
    "groupTitle": "playlist"
  },
  {
    "type":"Put",
    "url": "/playlistmanager/:id/:id2",
    "title": "Remove a track from playlist",
    "name": "Put/remove_a_track_from_playlist",
    "group": "playlist",
    "version": "0.1.0",
    "success":{
      "fields":{
        "Success 200":[
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },{
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the status of the operation</p>"
          }

        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "200",
            "optional": false,
            "field": "request",
            "description": "<p>ok http status code</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The response body contains the status of the operation</p>"
          }
        ]
      },     
      "examples": [
        {
          "title": "HTTP/1.1 200 ",
          "content": "HTTP/1.1 200 \n    {\n \"sucess\":\true\,\n \"Message\":\"Track was deleted successfully\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "headerStatusError",
            "description": "<p>the header status code is an error code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 ",
          "content": "HTTP/1.1 404 \n {\n \"success\":\false\,\n \"Message\": \"Can't find track with this id\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routers/playlistmanager.js",
    "groupTitle": "playlist"
  }
] });
