# python virtual environmnet
pipenv install : to create virtual environmnet
pipenv shell : to activate virtual environmnet
# as example to add python packege
pip install django-jazzmin
# to remove virtual environmnet
pipenv --rm


# frequently used commands
docker compose -f local.yml down
docker compose -f local.yml up -d

docker compose -f local.yml up --build -d --remove-orphans
docker compose -f local.yml logs
docker compose -f local.yml restart client 

# if django config file changed:
docker compose -f local.yml restart api

# First stop and remove the existing client container
docker compose -f local.yml stop client
docker compose -f local.yml rm -f client

# Remove the node_modules volume (if it exists)
docker volume rm estate_client_node_modules

# Rebuild with no cache
docker compose -f local.yml build --no-cache client

# Start it again
docker compose -f local.yml up -d client


# pipenv
pipenv --rm 
pipenv install
pipenv graph

# npm upgrade
npm i -g npm@latest

# docker start from Powershel las administrator: 
net start com.docker.service


# working iwith python shell
docker compose -f local.yml run --rm api python manage.py shell
# script to activate user enter line by line:
from django.contrib.auth import get_user_model
User = get_user_model()
user = User.objects.get(username='balda')
user.is_active = True
user.save()
print(f"User '{user.username}' has been enabled.")


# check if social already installed
pipenv run pip list | grep -E "djoser|social-auth"

# generate .gitignore file
npx gitignore python
#initialize git
git init -b main

# start django project
django-admin startproject config .
git config --global user.email "email2lead@gmail.com"
git config --global user.name "lead1974"

# check git files for ignore
git ls-files --other --exclude-standard

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

# make superuser
docker compose -f local.yml run --rm api python manage.py createsuperuser

# generate secret key for .env.SIGNING_KEY
python -c "import secrets; print(secrets.token_urlsafe(38))"

# 54 Building Apartment Model
docker compose -f local.yml run --rm api python manage.py startapp apartments

# move new apartment module into core_apps
cd /home/balda/labweb_ubuntu/nextjs/estate-mngt
sudo chmod +777 -R /home/balda/labweb_ubuntu/nextjs/estate-mngt
mv apartments core_apps

# run migrations
make makemigrations OR
docker compose -f local.yml run --rm api python manage.py makemigrations
make migrate OR
docker compose -f local.yml run --rm api python manage.py migrate

# 62 Building Reports Model
docker compose -f local.yml run --rm api python manage.py startapp reports
# once models.py is complete
make makemigrations
make migrate

#80 section for nextjs
cd client
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm cache clean --force
npm install
npm audit fix --force
npm run build
cd ..
docker compose -f local.yml up --build client -d
OR
docker compose -f local.yml up --build -d --remove-orphans

npm i -D eslint-config-standard@17.1.0 eslint-plugin-tailwindcss@3.14.1 eslint-config-pret
tier@9.1.0 prettier@3.2.4 sharp@0.33.2

#80 nextjs packages
npm i @heroicons/react 
npx shadcn@latest init -d --verbose

#83 dark/light themes
npm i next-themes

#85 shadcn components
npx shadcn@latest add dropdown-menu badge button avatar form card input label menubar pagination skeleton sheet tabs textarea select

npm install @radix-ui/react-icons
npm i date-fns

# Adding new API endpint for 'report' in this nextjs "clienet" project
1. Add typedTag to baseApiSlice.ts : 'Report'
2. Add new folder under lib/redux/features/reports
3. Add new validattionSchema to 'reports' : ReportCreateSchema.ts
4. Add new report schema to index.ts 
5. Add new endpoint to reportApiSlice.ts

