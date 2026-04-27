provider "aws" {
  region = "us-east-1"
}

resource "aws_dynamodb_table" "main" {
  name         = "saas-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "tenant_id"

  attribute {
    name = "tenant_id"
    type = "S"
  }
}
