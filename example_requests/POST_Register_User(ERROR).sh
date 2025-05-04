curl --request POST \
  --url 'http://localhost:3000/users/register' \
  --header 'Content-Type: application/json' \
  --data '{vd
    "username": "newuser",
    "password": "securepassword123"
    }'