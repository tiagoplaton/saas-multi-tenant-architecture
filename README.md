# SaaS Multi-Tenant Serverless Architecture on AWS

## Why I built this

I wanted to better understand how SaaS platforms handle multiple customers without having to spin up separate infrastructure for each one.

At first, isolating everything per client seemed safer. But it quickly becomes expensive and hard to scale. So I decided to explore a shared (multi-tenant) architecture and deal with the trade-offs that come with it (especially around data isolation).

---

## What this project does

This is a simplified backend for a SaaS application where multiple tenants can:

* create and manage their own data
* access only what belongs to them
* share the same infrastructure

The goal here is not the product itself, but how the system behaves when multiple tenants are involved.

---

## Architecture (high level)

I went with a serverless approach:

* S3 + CloudFront → static content delivery
* API Gateway → entry point for requests
* Lambda → business logic
* DynamoDB → data storage
* Cognito → authentication

This keeps things simple to operate and scales automatically, which is useful for unpredictable workloads.

---

## Key decisions (and why)

### Why serverless?

I didn’t want to deal with infrastructure management for this kind of system. Since SaaS workloads can be very uneven (some tenants active, others not), the pay-per-use model made sense.

That said, debugging and tracing across multiple services is definitely harder than in a monolithic setup.

---

### Why DynamoDB instead of RDS?

I initially considered using a relational database.

The problem is that scaling a relational model across multiple tenants introduces complexity pretty quickly (connections, indexing, cost).

With DynamoDB, I can partition data using `tenant_id`, which keeps the model simple and scalable.

The downside is losing relational flexibility and having to think more about access patterns upfront.

---

## Multi-tenant strategy

This project uses a **pooled model**, where all tenants share the same database.

Each item is scoped by a `tenant_id`.

This is efficient in terms of cost and scaling, but puts a lot of responsibility on the application layer to ensure proper isolation.

I’m currently enforcing that in the request handling logic.

---

## Security considerations

* Authentication handled by Cognito
* Tenant context extracted from user token
* Basic validation at the API level

This works for now, but in a real system I would go deeper into:

* fine-grained IAM policies
* stronger isolation mechanisms
* audit logging

---

## What I found challenging

One thing that became clear is that multi-tenancy is less about the services and more about controlling access correctly.

It's very easy to accidentally expose data if the tenant context is not consistently enforced.

Also, testing multiple tenants locally is not as straightforward as I expected.

---

## What I would improve

If I were to take this further:

* add tenant-level rate limiting
* implement better observability (structured logs, tracing)
* introduce a hybrid model for large tenants
* think about billing per tenant

---

## Final thoughts

This project made me realize that designing SaaS systems is mostly about trade-offs.

Sharing infrastructure reduces cost, but increases complexity around isolation and control.

I’m still exploring how this would behave at a much larger scale, especially with high-traffic tenants.

---

## Architecture diagram


![teste](architecture-diagram.png)
