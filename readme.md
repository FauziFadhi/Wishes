# How to Run
1. run `cp .env.example .env`
2. fill `.env` file attributes
3. run `docker-compose -f docker-compose.yml up -d`
4. run `npm install`
5. run `npm run migrate -- up` to make migration for database
6. run `npm run dev`

# Hookbin URL
```https://hookbin.com/Drz8GgXYWBTPajxx16pk```

# Account
- the authentication just using simple basic token.
- the basic token from username: `user1` password: `password1` if you want to change user data with id 1.
just change the number with user id from list.
- example if you want to update data for user with id 2, then the username: `user2` and the password: `password2`