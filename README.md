k8s-test commands:

docker build -t ericlys/app-ts:v2 .
docker push ericlys/app-ts:v2

kubectl apply -f k8s -n fist-app

kubectl rollout history deployment/app-ts -n fist-app

kubectl rollout undo deployment/app-ts --to-revision=1 -n fist-app

watch kubectl get pods -n fist-app

---
wget https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl delete -f metrics-server.yaml
kubectl apply -f metrics-server.yaml

kubectl get po -n kube-system

kubectl delete hpa app-ts-hpa -n fist-app

---
metrics server -
https://github.com/kubernetes-sigs/metrics-server

hpa - trigger
Metrics - cpu and memory 
v1- kubectl apply -f k8s/hpa.yaml  -n fist-app
kubectl get hpa -n fist-app
kubectl delete hpa app-ts-hpa -n fist-app