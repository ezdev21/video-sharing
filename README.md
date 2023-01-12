# video sharing website

**make sure to configure php configuration file(php.ini) upload_max_filesize!!**

![video-sharing](https://user-images.githubusercontent.com/78965149/182705961-462e6618-0c07-421b-8d58-4b9530a9a910.png)

clone the project `git clone https://github.com/ezra02/`

install componser dependencies `composer update`

copy .env files `cp .env.example .env`

generate key `php artisan key:generate`

migrate database `php artisan migrate`

start server `php artisan serve`
