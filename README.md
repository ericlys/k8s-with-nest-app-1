k8s-test commands:

docker build -t ericlys/app-ts:v2 .
docker push ericlys/app-ts:v2

kubectl apply -f k8s -n fist-app

kubectl rollout history deployment/app-ts -n fist-app

kubectl rollout undo deployment/app-ts --to-revision=1 -n fist-app