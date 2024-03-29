# Wedding Planner
Semesterarbeit FSDev Tanja Nobel

## Setup Backend
Notice: You don't need to do any database migrations. This project already contains a working database with test data.<br><br>

Clone this repository<br>
`$ git clone https://git.ffhs.ch/web-technologien/fsdev/fs22/w4b-c-fs001.fsdev.zh-sa-1/main_projects/tanja_nobel.git`

Change into backend directory<br>
`$ cd tanja_nobel/backend`

Start virtual environment<br>
`$ pipenv shell`

Install needed dependencies<br>
`$ pipenv install`

Start backend<br>
`$ python manage.py runserver`

Backend is running on http://localhost:8000/

## Important commands
Create migrations<br>
`$ python manage.py makemigrations`

Apply migrations<br>
`$ python manage.py migrate`

Run tests<br>
`$ coverage run manage.py test`

Check test coverage<br>
`$ coverage report`