# SaaS Multi-Tenant Architecture on AWS

## Why I built this

I wanted to understand how SaaS platforms handle multiple customers without creating separate infrastructure for each one.

At first, isolating resources per client seemed like the safest option, but it quickly becomes expensive and hard to scale. So I explored a shared (multi-tenant) architecture and the trade-offs involved.

---

## Architecture Overview

![Architecture](architecture-diagram.png)

This project simulates a serverless SaaS architecture using AWS services.

---

## How it works

* The frontend is served via S3 and CloudFront
* Requests go through API Gateway
* Cognito handles authentication
* Lambda processes business logic
* Data is stored in DynamoDB

Each request carries a `tenant_id`, which is used to isolate data within a shared database.

---

## Key decisions

### Multi-tenant model

I used a pooled model, where all tenants share the same infrastructure.

This reduces cost and simplifies scaling, but requires strict control over data access.

---

### Why DynamoDB?

I chose DynamoDB because it scales well and fits the access pattern of multi-tenant systems.

Using `tenant_id` as a partition key helps isolate and organize data efficiently.

---

### Why serverless?

Serverless removes the need to manage infrastructure and works well for unpredictable workloads.

However, it introduces challenges like debugging and tighter coupling to the cloud provider.

---

## Project structure

```
backend/
  lambdas/
    create-item/
      index.js

infrastructure/
  terraform/
    main.tf
```

---

## Limitations

This project is not deployed in AWS. It focuses on architecture design and infrastructure definition.

In a real-world scenario, I would improve:

* observability (logs, tracing)
* tenant-level rate limiting
* billing per tenant
* stronger security controls

---

## Final thoughts

This project helped me understand that multi-tenant architectures are less about the tools and more about the decisions behind them — especially around cost, scalability, and data isolation.
