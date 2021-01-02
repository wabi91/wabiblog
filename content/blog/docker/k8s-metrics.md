---
title: "k8s 기본 컴포넌트/플러그인"
date: 2021-01-01 21:01:63
category: docker
thumbnail: { thumbnailSrc }
draft: false
---

## 코어 프로세스 정리표

|구성요소|개요|
|:-:|---|
|kubectl|K8s 클러스터를 조작하기 위한 도구로 가장 빈번하게 이용되는 커맨드 라인 인터페이스다.|
|kube-apiserver|kubectl 등의 API 클라이언트로부터 오는 REST 요청을 검증하고, API 오브젝트를 구성하고 상태를 보고한다.|
|kube-scheduler|쿠버네티스의 기본 스케줄러이며, 새로 생성된 모든 파드에 대해 실행한 최적의 노드를 선택한다. 스케줄러는 파드가 실행 가능한 노드를 찾은 다음 점수를 계산하여 가장 점수가 높은 노드를 선택한다.|
|kube-controller-manager|컨트롤러를 구동하는 마스터상의 컴포넌트|
|cloud-controller-manager|API를 통해서 클라우드 서비스와 연계하는 컨트롤러로, 클라우드 업체에서 개발한다.|
|etcd|K8s 클러스터의 모든 관리 데이터는 etcd에 저장된다. 이 etcd는 CoreOS가 개발한 분산 키/값 저장소로 신뢰성이 요구되는 핵심 데이터의 저장 및 접근을 위해 설계되었다.|
|kubelet|kubelet은 각 노드에서 다음과 같은 역할을 수행한다.<br/>- 파드와 컨테이너의 실행<br/>- 파드와 노드의 상태를 API 서버에 보고<br/>- 컨테이너의 동작을 확인하는 프로브 실행<br/>- 내장된 cAdvisor를 통해 메트릭 수집 및 공개|
|kube-proxy|kube-proxy는 각 노드에서 동작하며 로드밸런싱 기능을 제공한다.<br/>- 서비스와 파드의 변경을 감지하여 최신 상태로 유지<br/>- iptables 규칙을 관리<br/>- 서비스명과 ClusterIP를 내부 DNS에 등록|
|coredns|파드가 서비스 이름으로부터 IP 주소를 얻기 위해 사용된다. 버전 1.11부터 kube-dns 대신 coredns 가 사용되었다. 이전의 kube-dns가 부족했던 신뢰성, 보안성, 유연성이 coredns에서 개선되었다. CoreDNS 프로젝트는 CNCF가 관리한다.|

## 애드온 컴포넌트

|구성요소|개요|
|:-:|---|
|kube-flannel|kube-flannel은 모든 노드에서 실행되어 여러 노드 사이에서 IPv4 네트워크를 제공한다. 이에 따라 컨테이너(파드)는 K8s 클러스터 내부에서 사용되는 IP 주소를 바탕으로 다른 노드에 있는 파드와 통신할 수 있다. 네트워크 접근제어가 필요한 경우에는 calico를 사용해야한다.|
|calico-kube-controllers|calico를 위한 컨트롤러. 데이터 스토어로서 etcd를 이용하기 위하여 사용된다.|
|calico-node|모든 노드에서 실행되어 노드 간 파드의 통신, 라우팅, 네트워크 접근 관리 기능을 제공한다.|
|kubernetes-dashboard|Web 대시보드|
|heapster|kebelet에 내장된 cAdvisor로부터 메트릭 정보를 수집. 버전 1.11부터 지원이 중단되었다.|
|metrics-server|heapster를 대신하여 버전 1.8부터 도입되었다. API의 aggregation layer를 통해서 K8s 클러스터 전체로부터 메트릭을 수집한다.|

--------

참고서적 - 15단계로 배우는 도커와 쿠버네티스