terraform {
  required_providers {
    # aws = {
    #   source  = "hashicorp/aws"
    #   version = "4.48.0"
    # }
    environment = {
      source = "EppO/environment"
      version = "1.3.3"
    }
    null = {
      source = "hashicorp/null"
      version = "3.2.1"
    }
    # random = {
    #   source  = "hashicorp/random"
    #   version = "3.4.3"
    # }
  }
  required_version = ">= 1.3.0"
}

provider "environment" {}

data "environment_variables" "all" {}

locals {
  github_actor = try(data.environment_variables.all.items["GITHUB_ACTOR"], "")
  github_base_ref = try(data.environment_variables.all.items["GITHUB_BASE_REF"], "")
  github_event_name = try(data.environment_variables.all.items["GITHUB_EVENT_NAME"], "")
  github_job = try(data.environment_variables.all.items["GITHUB_JOB"], "")
  github_ref = try(data.environment_variables.all.items["GITHUB_REF"], "")
  github_ref_name = try(data.environment_variables.all.items["GITHUB_REF_NAME"], "")
  github_ref_protected  = try(data.environment_variables.all.items["GITHUB_REF_PROTECTED"], "")
  github_ref_type  = try(data.environment_variables.all.items["GITHUB_REF_TYPE"], "")
  github_repository_owner = try(data.environment_variables.all.items["GITHUB_REPOSITORY_OWNER"], "")
  github_sha = try(data.environment_variables.all.items["GITHUB_SHA"], "")
  github_tag = try(data.environment_variables.all.items["GITHUB_TAG"], "")
  github_triggering_actor = try(data.environment_variables.all.items["GITHUB_TRIGGERING_ACTOR"], "")

  aws_default_region = var.aws_regions_names[0]

  pull_request = tostring(local.github_ref_name != var.git_default_branch)
  development = tostring(local.github_ref_name == var.git_default_branch && local.github_event_name == "push")
  staging = tostring(local.github_ref_name == var.git_default_branch && local.github_tag == "")
  production = tostring(local.github_ref_name == var.git_default_branch && local.github_tag != "")

  environment = local.development ? "development" : local.staging ? "staging" : local.production ? "production" : "pr"
}