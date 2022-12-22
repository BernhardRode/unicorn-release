variable "aws_regions_names" {
  type    = list(string)
  default = ["eu-central-1"]
}

variable "git_default_branch" {
  type    = string
  default = "main"
}