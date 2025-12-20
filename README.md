# Main Project Documentation

## Оглавление

[KyaMovVM/Main/wiki](http://192.168.0.104:3000/KyaMovVM/Main/wiki)

- [1. Overview](../wiki/1-overview.md)
- [2. Build](../wiki/2-build.md)
- [3. API](../wiki/3-api.md)
- [4. REST](../wiki/4-rest.md)
- [5. Protocols](../wiki/5-protocols.md)
- [6. Browser](../wiki/6-browser.md)
- [7. Event Loop](../wiki/7-event-loop.md)
- [8. Render](../wiki/8-render.md)
- [9. Node](../wiki/9-node.md)
- [10. Markdown](../wiki/10-markdown.md)
- [11. OOP](../wiki/11-oop.md)
- [12. Testing](../wiki/12-testing.md)
- [13. Algorithms](../wiki/13-algoritms.md)

## Проверка библиотек например на размер и скорость

https://bundlephobia.com/

## Мемоизация и оптимизации

https://www.youtube.com/watch?v=VNNLNC5h7ZI
https://habr.com/ru/companies/ruvds/articles/332384/

## Функциональное программирование

https://www.youtube.com/watch?v=ScgmlDb5ed4

## Runner

## Gitea Runner для Node.js приложения

Этот раннер предназначен для запуска Node.js приложения `test-node.js` в Docker-контейнере на 15 минут.

## Как использовать

1. Убедитесь, что у вас есть доступ к Gitea и настроен runner.
2. Запустите руннер, и он автоматически соберёт и запустит приложение.
3. Через 15 минут приложение будет остановлено и удалено.

## Файлы

- `Dockerfile` — Docker-образ для приложения.
- `runner.sh` — скрипт для запуска и остановки приложения.
- `runner.yml` — конфигурация руннера.
- `config.yml` — дополнительные настройки для руннера.

## Примечания

- Приложение будет доступно по адресу `http://94.41.87.98:3010`.
- Время выполнения ограничено 15 минутами.
- Все изменения в коде будут автоматически пересобраны и перезапущены.

https://github.com/OWASP/CheatSheetSeries

## Контейнерные заметки

https://docs.docker.com/guides/
https://docs.docker.com/guides/testcontainers-cloud/
https://docs.docker.com/guides/bake/

When working with containers, you usually need to create a Dockerfile to define your image and a compose.yaml file to define how to run it.

To help you create these files, Docker has a command called docker init. Run this command in a project folder, and Docker will create all the required files needed. In this guide, you will see how this works.

https://docs.docker.com/reference/dockerfile/

https://docs.docker.com/get-started/workshop/02_our_app/

## kubernetes k8s

https://www.docker.com/resources/container-orchestration-101-on-demand-training/

https://www.docker.com/blog/how-to-set-up-a-kubernetes-cluster-on-docker-desktop/

https://medium.com/accredian/kubernetes-101-a-beginners-guide-to-container-management-a7937106b73

``` sh
kubectl apply -f pod.yaml
kubectl get pods
kubectl logs demo
kubectl delete -f pod.yaml

docker swarm init
docker service create --name demo alpine:latest ping 8.8.8.8
docker service ps demo
docker service logs demo
docker service rm demo

kubectl apply -f bb.yaml
kubectl get deployments
kubectl get services
kubectl delete -f bb.yaml
```

## Pods

``` yaml
# pods/simple-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```

kubectl apply -f https://k8s.io/examples/pods/simple-pod.yaml

https://kubernetes.io/docs/concepts/workloads/pods/
https://kubernetes.io/docs/concepts/workloads/pods/#working-with-pods

## terraform

## Helm

https://gitea.com/gitea/helm-gitea

## Grafana

## Webpack

## gitea guidelines-frontend

https://docs.gitea.com/contributing/guidelines-frontend

## Рабочие нагрузки Wasm

https://www.docker.com/blog/docker-wasm-technical-preview/

https://habr.com/ru/articles/475778/

https://wasi.dev/

https://webassembly.org/

## Testcontainers

https://testcontainers.com/guides/introducing-testcontainers/

https://testcontainers.com/guides/

https://www.docker.com/blog/testcontainers-best-practices/

https://docs.docker.com/guides/testcontainers-cloud/
