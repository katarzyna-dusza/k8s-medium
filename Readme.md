# Kubernetes in a nutshell - tutorial for beginners



## Overview

This repo contains exercises, which together with [this](https://medium.com/@katarzyna.jolanta.dusza/kubernetes-in-a-nutshell-tutorial-for-beginners-caa442dfd6c0?source=friends_link&sk=88d18b5a732b355271f19bab020bc83d) blog post, will help you start working with Kubernetes (k8s).
You can look at my [Kubernetes troubleshooting](https://medium.com/@katarzyna.jolanta.dusza/kubernetes-troubleshooting-42ac0754422d) guide, which covers the most common beginner questions and mistakes.



## Prerequisites

- [Docker](<https://docs.docker.com/>)
- [Minikube](<https://kubernetes.io/docs/tasks/tools/install-minikube/>)
  - macOs: `brew cask install minikube`
- [VirtualBox](<https://www.virtualbox.org/>) (for minikube)
  - macOs: `brew cask install virtualbox`


Check the tools:

```bash
# --- check docker: running containers ---
docker ps

# output:
CONTAINER ID	IMAGE	COMMAND		CREATED		STATUS		PORTS		NAMES

# --- check minikube: version & run minikube ---
minikube -v
minikube start
kubectl get all

# output:
There is a newer version of minikube available (v1.0.0).  Download it here:
https://github.com/kubernetes/minikube/releases/tag/v1.0.0

To disable this notification, run the following:
minikube config set WantUpdateNotification false
😄  minikube v0.35.0 on darwin (amd64)
🔥  Creating virtualbox VM (CPUs=2, Memory=2048MB, Disk=20000MB) ...
💿  Downloading Minikube ISO ...
 184.42 MB / 184.42 MB [============================================] 100.00% 0s
📶  "minikube" IP address is 192.168.99.100
🐳  Configuring Docker as the container runtime ...
✨  Preparing Kubernetes environment ...
💾  Downloading kubelet v1.13.4
💾  Downloading kubeadm v1.13.4
🚜  Pulling images required by Kubernetes v1.13.4 ...
🚀  Launching Kubernetes v1.13.4 using kubeadm ...
⌛  Waiting for pods: apiserver proxy etcd scheduler controller addon-manager dns
🔑  Configuring cluster permissions ...
🤔  Verifying component health .....
💗  kubectl is now configured to use "minikube"
🏄  Done! Thank you for using minikube!


NAME				TYPE		CLUSTER-IP		EXTERNAL-IP		PORT(S)		AGE
service/kubernetes  ClusterIP	x.x.x.x			<none>			443/TCP		2m


```



## Prepare your environment

To start working with k8s, run these commands:

```bash
# Start minikube:
minikube start

# Use Docker at the command line of your local machine 
# to communicate with the Docker daemon inside the minikube.
# This command exports docker env variables and configures your shell. 
# The docker host url will point to the minikube's one. 
# From now, everytime when we build a new docker image, 
# it will be visible inside the minikube.
# When you create a deployment and provide a docker url to your image,
# it will take the image previously built by you.
eval $(minikube docker-env)

# Enable the NGINX Ingress controller:
minikube addons enable ingress

# Check if the Ingress controller is there:
kubectl get po -n kube-system

# Add this line to your /etc/hosts:
# 192.168.99.XXX - it's IP of the minikube cluster. 
# You can simply check it by running: minikube ip
# (replace your app names with BACKEND_NAME and FRONTEND_NAME)
192.168.99.XXX       backend.domain.com frontend.domain.com

```



## Deploying database


```bash
kubectl apply -f database/deployment/database-deployment.yaml
kubectl apply -f database/deployment/database-service.yaml
```



## Deploying backend


```bash
# build backend docker image
docker build -t backend:v1 ./backend

# deploy
kubectl apply -f ./backend/deployment/backend-deployment.yaml
kubectl apply -f ./backend/deployment/backend-service.yaml
kubectl apply -f ./backend/deployment/backend-ingress.yaml
```



## Deploying frontend

```bash
# build backend docker image
docker build -t frontend:v1 ./frontend

# deploy
kubectl apply -f ./frontend/deployment/frontend-deployment.yaml
kubectl apply -f ./frontend/deployment/frontend-service.yaml
kubectl apply -f ./frontend/deployment/frontend-ingress.yaml
```

This docker images can take some time since `npm install` is running inside. If you want to save your time in the future (you will build the image a couple of times), replace the Dockerfile with the following one:

```dockerfile
FROM nginx

COPY ./build /etc/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

and then run:

```bash
cd frontend

# install dependencies
npm install

# build production code
npm run build

# build backend docker image
docker build -t frontend:v1 .
```

## Health check:

##### Proof (1)

```bash
# display all resources deployed on k8s
kubectl get all

# display deployments/pods/services/ingresses deployed on k8s
kubectl get deployment # or kubectl get deployments or kubectl get deploy
kubectl get pod # or kubectl get pods or kubectl get po
kubectl get service # or kubectl get services or kubectl get svc
kubectl get ingress # or kubectl get ingresses or kubectl get ing

# or 
kubectl get deploy,po,svc,ing
```

##### Proof (2)

Go to minikube [dashboard](<http://127.0.0.1:52686/api/v1/namespaces/kube-system/services/http:kubernetes-dashboard:/proxy/#!/overview?namespace=default>) and see your deployments there.


##### Proof (3)

Go to **backend.domain.com**. Under the main root (`/`), you should see: _"backend works"_.

##### Proof (4):

Go to **frontend.domain.com** . Now, we should be able to open the frontend app in the browser. 



## Excercise

It's time for an exercise for you. Inside the **exercise** directory, you will find a small service with Dockerfile. All you need to do is build the image and create yamls to deploy the app on k8s!

Good luck!


## Play with MongoDB

```bash
# list all pods
kubectl get po

# enter the container 
kubectl exec -it pod-name bash

#--------- inside mongo container

# run mongo shell
mongo

# list all databases
show dbs

# select movies-db database
use movies-db

# add new movie to the collection
db.movies.insert({ title: 'title', genres: 'genres', cast: 'cast', rate: 8, runtime: 120 })

# list all movies
db.movies.find().pretty()

```
