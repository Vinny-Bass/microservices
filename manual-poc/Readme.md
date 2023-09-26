# Manual Microservices with Node.js and React

This repository hosts a simple project designed to teach the basics of building a microservices-based application. The project was written from scratch, utilizing a minimalistic approach with lightweight libraries such as Express, CORS, and Axios. The primary goal is to understand microservices under the hood without being overwhelmed by complex tools and setups. 

## Overview

The project consists of a basic blog application. The backend is built using a microservices architecture while the frontend is powered by React. For orchestration of the services I'm using Kubernetes.

### Directory Structure

```
.
├── infra
│   ├── k8s
├── services
│   ├── post
│   ├── comments
│   ├── query
│   └── event-bus
│   └── moderation
└── blog-client
```

### Services

- **Post Service**: Handles the creation of posts. Upon creation of a post, it emits a `PostCreation` event to the event bus.
  
- **Comments Service**: Handles the creation of comments for an post. Upon creation of a comment, it emits a `CommentCreation` event to the event bus. When receive a `CommentModerate` emits an `CommentUpdated` event to the event bus.

- **Moderation Service**: Handles the moderation of comments for an post. Upon moderation of a comment, it emits a `CommentModerate` event to the event bus.
  
- **Query Service**: Responsible for storing data so the client can query data with joins. It listens to the `PostCreation` and `CommentCreation` event and stores it for the frontend to query later. Also listen for `CommentUpdated`.
  
- **Event Bus Service**: Acts as a communication layer among services. Whenever an event is published (like `PostCreation`), it broadcasts that event to all other services.

### Infra Layer

Each service has his own k8s deployment file, each deployment file contains a Deployment config with a reference to the container we are pulling the image from, and a service exposing that service to other services via an ClusterIP.

In order to our front-end service receives traffic from the external world we use a Load balancer that will redirect the traffic to an `Ingress Controller` inside our cluster that will be responsible for distribute the request into our pods. The `Ingress Controller` that we are using is called [Ingress-Nginx Controller](https://kubernetes.github.io/ingress-nginx/deploy/).
### Blog-Client

The `blog-client` directory contains a React application which serves as the frontend of the blog. It communicates with the various services to fetch, display, and send data to the backend.

## Why Microservices?

Microservices is an architectural style that structures an application as a collection of loosely coupled services. This means that each service is responsible for a specific piece of functionality, and can operate independently. By doing so, we can achieve:

- Better fault isolation.
- Easier scalability.
- Independent deployments.
- Language and technology diversity.

## Disclaimer

This application is for **learning purposes only**. It is designed to provide a foundational understanding of microservices. It is not intended for a production environment, as it may lack some advanced features, optimizations, and security considerations.

## Getting Started

1. Clone the repository.
2. Navigate to each service directory and run `npm install` to install dependencies.
3. Start each service using `npm start`.
4. Navigate to the `blog-client` directory, install dependencies using `npm install`, and then start the React app with `npm start`.