variable "project_name" {
  type        = map
  description = "Name of the project."
  default     = {
    development  = "ga-terraform-development"
    staging = "ga-terraform-staging"
    production = "ga-terraform-production"
  }
}

variable "aws_region" {
}

variable "env" {
  description = "env: development, staging or production"
}