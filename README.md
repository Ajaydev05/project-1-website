Project 1 - Full-Stack E-Commerce Website
A full-stack e-commerce web application built with React (frontend) and Python/Flask (backend), served through Nginx as a reverse proxy. The entire application is containerized using Docker and Docker Compose, and deployed on Kubernetes running on AWS EC2.

🏗️ Architecture Overview
                        ┌─────────────────────────────────────┐
                        │         Kubernetes Cluster           │
                        │           (AWS EC2)                  │
                        │                                      │
User ──▶ NodePort ──▶  │  Nginx Pod ──▶ Frontend Pod (React)  │
                        │           └──▶ Backend Pod (Flask)   │
                        │                    │                 │
                        │              MongoDB Pod             │
                        │                    │                 │
                        │           PersistentVolume           │
                        └─────────────────────────────────────┘

🛠️ Tech Stack
LayerTechnologyFrontendReact.js, CSS, HTMLBackendPython, FlaskReverse ProxyNginxDatabaseMongoDBContainerizationDocker, Docker ComposeOrchestrationKubernetesCloudAWS EC2

📁 Project Structure
project-1-website/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── models/
│   ├── requirements.txt
│   └── Dockerfile
├── k8s/
│   ├── namespace.yaml
│   ├── pv.yaml
│   ├── pvc.yaml
│   ├── deployment-frontend.yaml
│   ├── deployment-backend.yaml
│   ├── deployment-mongo.yaml
│   └── services.yaml
├── docker-compose.yml
├── nginx.conf
└── README.md

⚙️ Prerequisites

Docker & Docker Compose
Kubernetes cluster (kubeadm / minikube / AWS EC2)
kubectl configured
Git


🚀 Getting Started
1. Clone the Repository
bashgit clone https://github.com/Ajaydev05/project-1-website.git
cd project-1-website
2. Run with Docker Compose (Local)
bashdocker-compose up --build
Access the app at http://localhost:80
3. Deploy on Kubernetes
bash# Step 1 - Create namespace
kubectl apply -f k8s/namespace.yaml

# Step 2 - Create storage
kubectl apply -f k8s/pv.yaml
kubectl apply -f k8s/pvc.yaml

# Step 3 - Deploy (MongoDB first, then backend, then frontend)
kubectl apply -f k8s/deployment-mongo.yaml
kubectl apply -f k8s/deployment-backend.yaml
kubectl apply -f k8s/deployment-frontend.yaml

# Step 4 - Expose services
kubectl apply -f k8s/services.yaml
Or apply everything at once:
bashkubectl apply -f k8s/
4. Verify Deployment
bash# Check all pods are running
kubectl get pods -n ecommerce

# Check services
kubectl get svc -n ecommerce

# Check storage
kubectl get pv,pvc -n ecommerce
Access the app at http://<EC2-Public-IP>:30000

🌐 Nginx Configuration
Nginx acts as a reverse proxy routing traffic between the React frontend and Flask backend:

/ → React frontend (port 3000)
/api/ → Flask backend (port 5000)

See nginx.conf for full configuration.

🐳 Docker Compose
Runs all services locally with a single command:
bashdocker-compose up --build    # Start all services
docker-compose down          # Stop all services
docker-compose logs -f       # View logs

📊 Kubernetes Resources
ResourcePurposeNamespaceIsolates all resources under ecommercePersistentVolumePhysical storage for MongoDB dataPersistentVolumeClaimMongoDB pod's claim on storageDeployment (Frontend)Manages React pods with 2 replicasDeployment (Backend)Manages Flask pods with 2 replicasDeployment (MongoDB)Manages MongoDB pod with persistent storageService - ClusterIPInternal communication between podsService - NodePortExternal access via EC2 public IP

🙋‍♂️ Author
Ajaydev A

GitHub: @Ajaydev05
LinkedIn: linkedin.com/in/ajaydev-a-
Email: ajaydev05.2003@gmail.com
