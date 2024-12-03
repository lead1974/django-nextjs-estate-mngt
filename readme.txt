# pipenv
pipenv -rm 
pipenv install
pipenv graph

# generate .gitignore file
npx gitignore python
#initialize git
git init -b main

# start django project
django-admin startproject config .
git config --global user.email "email2lead@gmail.com"
git config --global user.name "lead1974"

pipenv install --dev psycopg2-binary==2.9.9 watchfiles==0.21.0 black==24.3.0

# building requirements
mkdir -p requirements && touch requirements/{base,local,production}.txt
mkdir -p config/settings && touch config/settings/{__init__,base,local,production}.py

# generate secret key
python -c "import secrets; print(secrets.token_urlsafe(38))"

# ensure env variable are activated
pip install --upgrade setuptools

# start django server
python manage.py runserver

# create django apps
mkdir core_apps/__init__.py
python manage.py startapp users
python manage.py startapp common
python manage.py startapp profiles
python manage.py startapp posts
python manage.py startapp issues
python manage.py startapp ratings

python manage.py runserver

# docker setup
# check local.yml file for docker
docker compose -f local.yml config
# docker create network
docker network create estate_prod_nw  
output: d60d87eb4503891f0d866e86765f1c49f6cbcd2e39f58c14efea8e2a63d07600
# build images 
DOCKER_BUILDKIT=1 docker compose -f local.yml build --no-cache
docker compose -f local.yml up --build -d --remove-orphans
# check docker volumes
docker volume inspect api_estate_prod_postgres_data

# makefiles
sudo apt update
sudo apt install make





