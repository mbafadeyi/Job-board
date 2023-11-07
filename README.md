# Job board
 A full-stack job board built with Django Rest Framework and React

## Introduction
This job board allows authenticated users to post jobs which can be sponsored for more visibility on the website. The paid sponsorship is handled by Stripe. The Cross-Origin Resource Sharing (CORS) was properly configured for security. The overall style was designed with TailwindCSS.

### Technologies
The project was created with the following:
<br/>
    • Python 3.11.4 <br/>
    • Django 4.2.6 <br/>
    • Django Rest Framework 3.14.0 <br/>
    • Django CORS Headers 4.3.0 <br/>
    • React 18.2.0 <br/>
    • Stripe 2.3.1 <br/>
    • Postgres <br/>
    • TailwindCSS <br/>

### Setup
This project was bootstrapped with Cookiecutter Django. To run this project;
<p>Set your environment variables for Stripe and other requirements inside <code>.envs/.local</code>.</p>
<p>You can then run the project with <code>python manage.py runserver</code>.</p>

### Run the frontend with:

<div>
<p>cd frontend</p>
<p>npm i</p>
<p>npm run start</p>
</div>
