k8s-test commands:

<!-- build project --------------------------->
docker build app-ts:v2 .
docker tag app-ts:v2 ericlys/app-ts:v2 
ou
docker build -t ericlys/app-ts:v2 .

docker push ericlys/app-ts:v2
<!-- ------------------------------------- -->

<!-- namespace k8s-->
kubectl create ns fist-app

<!-- aplicar configuracao no namespace -->
kubectl apply -f k8s -n fist-app

<!---------- comando emergencial (imperativo) -recomendado fazer tbm no deployment.yaml(declarativo)------------>
<!-- para acompanhar as revisoes -->
kubectl rollout history deployment/app-ts -n fist-app

<!-- para retornar para uma revisao(versao) especifica que já foi aplicada em algum momento/ --to-revision=1 é opcional-->
kubectl rollout undo deployment/app-ts --to-revision=1 -n fist-app
<!-- ------------------------------------------------ -->

watch kubectl get pods -n fist-app

<!-- ---configurando hpa para que funcione em ambiente local para que funcione o certificado-->
<!-- --kubelet-insecure-tls -->
<!-- https://github.com/kubernetes-sigs/metrics-server -->
wget https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
<!-- renomeamos o components para metrics-server e add o kubelet insecure tls em spec no deploy do arquivo -->
kubectl delete -f metrics-server.yaml
kubectl apply -f metrics-server.yaml

<!-- verificar o cpu e a memoria dos pods -->
kubectl top po -n fist-app
<!-- ------------------------------------------------------------------------------------------ -->
<!-- comando para verificar configuracao de hpa ou outros arquivos -->
kubectl get hpa -n fist-app
<!--  -->

kubectl get po -n kube-system

<!-- remover configuracao hpa -->
kubectl delete hpa app-ts-hpa -n fist-app
<!--  -->

<!-- --- stress test -->
https://github.com/fortio/fortio
https://hub.docker.com/r/fortio/fortio
kubectl get svc -n fist-app  -- to get the service to use the cluster app
<!-- executa um teste de carga temporário com o Fortio diretamente no seu cluster Kubernetes, gerando tráfego HTTP para o seu serviço app-ts-svc. -->
kubectl run -it fortio -n fist-app --rm --image=fortio/fortio -- load -qps 6000 -t 120s -c 50 "http://app-ts-svc/example-k8s"
<!-- 
  Cria um pod fortio temporário no namespace fist-app.
  Envia 6000 requisições por segundo por 2 minutos com até 50 conexões simultâneas.
  Para o endpoint: http://app-ts-svc/example-k8s.
  Após o teste, o pod se remove automaticamente (--rm).
 -->


<!-- --- Probes - probing and verification ----------------------------------------------- -->
- Checks whether the application is ready to be used
- For these tests, specific routes are required
- Nestjs lib to check external services - @nestjs/terminus

StartupProbe - 
aims to ensure that it will go up and performs tests, such as connecting to external services, database, etc.

ReadinessProbe - 
checks whether the application is ready to receive traffic

LivenessProbe -
checks if the application is alive, being able to rebuild, alerts, etc.

Ex: App A -Mysql, Kafka, Redis (this all routes need tests this all external dependencies)
<!-- ------------------------------------------------------------------------------------ -->



<!-- Persistencia ------------------------------------------------------------------------->
>StorageClass - conversa com o nosso provisionador
<!-- mostra o storageclass padrão -->
kubectl get storageclass
kubectl apply -f k8s.config/storageclass.yaml
<!--É legal desalocal o volume do cluster para evitar complexidades de aumento de memória futuros-->
>Volumes - reserva de espaco alocado com o nosso provisiodador
  kubectl apply -f pv.yaml 
  kubectl get pv -n fist-app
<!-- pvc - associa o deploy com o volume, requerendo uma parte do volume reservado -->
>Claim - pvc - persistent volume claim
    kubectl get pvc -n fist-app
    kubectl describe pvc -n fist-app

    <!-- testando- entrando no pod e consumindo o pvc -->
    kubectl get pods -n fist-app
    kubectl exec -it app-ts-f8d5588b9-6fmcl -n fist-app -- /bin/sh
    <!-- add um arquivo lá dentro -->
    echo "Olá" > file.txt  
    ls
    <!-- porém se entramos na outra replica o arquivo n estara lá -->
    e se apagarmos o pod
    kubectl delete pod app-ts-f8d5588b9-6fmcl -n fist-app
    e entrarmos no novo o arquivo tbm n estara lá
    por isso precisamos configurar no deployment o volumeMounts
<!-- ------------------------------------------------------------------------------------ -->