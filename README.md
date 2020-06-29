# ProxyPics Inc. Coding Challenge

Open two terminals to run both projects.

### Back-end installation

You need to change the .env file with some credentials.
PG_USER: your postgres username.
PG_PASSWORD: your postgres password.
PG_HOST: your host, e.g: localhost.
BUCKET: the name of a public bucket, so the app can upload images to this bucket.
REGION: region of your bucket, e.g: us-east-2.
AWS_ACCESS_KEY: your aws access_key.
AWS_SECRET_KEY: your aws secret_key (these keys must have some s3 permissions).
GOOGLE_MAPS_KEY: your google maps API key, this key must have Android, IOS and Places APIs allowed. You can configure that on your Google Console.

After configuring your .env, run the following commands:

```sh
$ cd back
$ bundle
$ rails db:create db:migrate db:seed
$ rails s
```

### Front-end installation (ios)

```sh
$ cd front
$ yarn
$ yarn ios
```

### Testing

To run the back-end suite, run the following commands:

```sh
$ cd back
$ rspec
```
