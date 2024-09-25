# Deployment Guide for EKS

aws eks update-kubeconfig --region ap-south-1 --name engees-11za-eks

## Table of Contents
- [Basic requirements](#basic-requirements)
- [Configuration](#configuration)
- [Available Commands](#available-commands)
- [Cluster Configuration](#cluster-configuration)
- [Run Terraform](#run-terraform)
- [Deploy Kubernetes Dashboard](#deploy-kubernetes-dashboard)
- [List Kubernetes Pods](#list-kubernetes-pods)
- [Get AWS Token](#get-aws-token)
- [Connect to Kubernetes Dashboard](#connect-to-kubernetes-dashboard)
- [MongoDB Installation](#mongodb-installation)

## Cluster Configuration

1. Create AWS Account Credentials
3. Deploy Prerequisites Services
4. Assume role and deploy AWS resources
5. Assume role and deploy AWS App Settings
6. Deploy kubernetes dashboard
7. Connect to kubenetes dashboard

## Basic requirements

Tools required to use the configuration: `terraform`, `make`.

Terraform installation is described here: [Terraform installation](https://developer.hashicorp.com/terraform/downloads).

Minimum Terraform version (defined in `11za/terraform.tf`): `v1.3.6`

## Configuration

The structure of the repository is divided into two directories:
* `modules/` - custom modules that make up the environment are defined here

The environment directory contains 3 directories with separate stacks:
* `11za/prerequisites` - this stack creates resources, roles required to manage the infrastructure resources
* `11za/resources` - stack with infrasrtucture resources
* `11za/app` - stack with resources related to the application, like ingress, pod IRSA roles etc.

The configuration of a single environment is described in several files:

* `environment.tf` - main configuration file in which the configuration of the enviroment built from modules is defined
* `environment.tfvars` - additional file to overwrite values for variables defined in `variables.tf`
* `Makefile` - `Makefile`s and `make` command are used as wrapper for Terraform CLI; it includes `variables.env` and `../../Makefile.base` (intended to be used between different environments)
* `output.tf` - file in which environment outputs can be defined
* `terraform.tf` - main terraform provider and backend configuration file
* `variables.env` - env file that overwrites values for variables defined in `variables.tf`
* `variables.tf` - file in which environment variables (inputs) are defined

The `variables.env` file needs to be adjusted. The most important variables are:

* `REGION` - define the target AWS region in which the environment will be launched
* `PREFIX` - update environment prefix as required
* `ENVIRONMENT` - environment name
* `ENV_NUMBER` - and environment number used to generate VPC CIDR.

These are the main variables on which the name of S3 bucket (`S3_STATE`) and object key (`S3_KEY_PREFIX`) are defined and the correctness of the configuration depends on them. You can adjust the other parameters as needed and you also must define values for several required variables, for which Terraform will ask if values are not provided.

Parameters of the environment modules, such as instance type of EKS node, can be defined directly in `environment.tf` file or can be moved to `variables.env` and referenced with `var.*`.
Not all available module variables are defined in this file because default values are used. The list of available variables that can be used for each module in `environment.tf` file can be found in `modules/*/variables.tf` files.

## Available Commands

Run `make` or `make help` to list currently available commands and their short description.

* `state-bucket` - Creates S3 bucket for Terraform state
* `init` - Initializes Terraform backend
* `bootstrap` - Creates S3 bucket and initializes terraform remote state

* `fmt` `get` `graph` `output` `providers` `show` `validate` `version` - Pass arguments through to terraform which do not require remote state
* `apply` `console` `destroy` `plan` `refresh` - Pass arguments through to terraform which require remote state and use *.tfvars file
* `pull-state` - Pull current state and output to stdout

* `help` - Show help

## Run Terraform

Clone the 11za-IaaC repository

To make the Terraform state bucket run the following command
<pre><code>make state-bucket</code></pre>

Now change the folder and move to Prerequisites folder.
<pre><code>cd 11za/prerequisites </code></pre>

## Deploy Kubernetes Dashboard

<pre><code>kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml</code></pre>


## List Kubernetes Pods

<pre><code>kubectl get pods -n kubernetes-dashboard</code></pre>


## Get AWS Token

<pre><code>aws eks get-token --cluster-name engees-11za-eks</code></pre>


## Connect to Kubernetes Dashboard

<pre><code>kubectl proxy</code></pre>

## MongoDB Installation

Create MongoDB Namespace
<pre><code>kubectl create namespace mongodb</code></pre>

Change the value of the namespace in the cluster-role-binding file with the namespace you want to deploy your services on
<pre><code>kubectl apply -f deploy/clusterwide</code></pre>

Apply the RBAC permissions on the MongoDB namespace
<pre><code>kubectl apply -k config/rbac --namespace mongodb</code></pre>

Apply the custom resource definition
<pre><code>kubectl apply -f config/crd/bases/mongodbcommunity.mongodb.com_mongodbcommunity.yaml</code></pre>

Create the Kubernetes Operator for MongoDB
<pre><code>kubectl create -f config/manager/manager.yaml --namespace mongodb</code></pre>

Deploy MongoDB Replica Set
<pre><code>kubectl apply -f config/samples/mongodb.com_v1_mongodbcommunity_cr.yaml --namespace mongodb</code></pre>

Create DB Users with appropriate roles and permissions
Make the changes in the config file for deployment

userAdminAnyDatabase
<pre><code>
    - name: my-user
         db: admin
         passwordSecretRef: # a reference to the secret that will be used to generate the user's password
           name: my-user-password
         roles:
           - name: clusterAdmin
             db: admin
           - name: userAdminAnyDatabase
             db: admin
           - name: testRole # apply the custom role to the user
             db: admin
         scramCredentialsSecretName: my-scram
</code></pre>