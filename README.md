<p align="center"><a href="https://laravel.com" target="_blank"><img src="http://www.invadems.com/storage/zLGzberJHau0XUt4ZRYZCE2l060tvVSz4aWqQOxz.png" width="400" alt="Laravel Logo"></a></p>



# Invadems Assessment Task
## This repo is assessment Task 
## How to test this project using your local machine, follow me up.

- First of all, clone this repo
- Then run `composer install` and `npm install`
- Then run the migration with this command `php artisan migrate --seed`
- Then open the browser and hit http://localhost:8000/ you'll navigate automatically to http://localhost:8000/login because you are not signed in
- So lets login using these credentials that created using `--seed` flag when run the migration
- Use this email `a.elmoslmany@invadems.com` and this password `password` then **login**
- Hooray🥳 You are now authenticated user
- You could create, edit, delete (soft delete) tasks, Also you could filter tasks by status and using pagination to see all tasks
- Also you could see your trashed tasks and restore them safely.
