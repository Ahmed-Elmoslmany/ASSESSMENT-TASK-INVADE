<p align="center"><a href="https://laravel.com" target="_blank"><img src="http://www.invadems.com/storage/zLGzberJHau0XUt4ZRYZCE2l060tvVSz4aWqQOxz.png" width="400"></a></p>



# Invadems Assessment Task

<h2 align="center">Tools</h2>
- [Laravel](https://laravel.com) • [Sanctum](https://laravel.com) • [React](https://react.dev/) • [Tailwind CSS](https://tailwindcss.com/)

## How to test this project using your local machine, follow me up.

- First of all, make sure these tools are installed: `git`, `composer`, `node` and `php-82`.
- Clone this repo `git clone https://github.com/Ahmed-Elmoslmany/ASSESSMENT-TASK-INVADE.git`.
- Copy the `.env.example` file and name it `.env`.
- Then run this `composer install && npm install && php artisan key:generate && php artisan migrate --seed`.
- Then run `php artisan serve` and `npm run dev` in two seperate terminals.
- Then open the browser and hit http://localhost:8000/ you will automatically get redirected to http://localhost:8000/login because you are not signed in yet.
- Click login button with default values.
- Hooray🥳 You are now authenticated and will be redirected to the todos.
- You now can create, edit, delete (soft delete) tasks, Also you can see paginated tasks with filteration.
- Also you could see your trashed tasks and restore them safely.


### Steps supported by images
<h3 align="center">Login</h3>
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://github.com/user-attachments/assets/72e9eda9-5716-4630-a956-7f0ea933c031" width="400"></a></p>

#### Feel free to explore the filter and pagination and also trash, You'll also notice the toast at top-right

