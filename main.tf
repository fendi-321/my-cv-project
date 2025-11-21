provider "aws" {
  region = "ap-southeast-1" # Singapore Region
}

locals {
  bucket_name = "maffindi-cv-website-${random_id.suffix.hex}"
}

resource "random_id" "suffix" {
  byte_length = 4
}

# S3 Bucket
resource "aws_s3_bucket" "website_bucket" {
  bucket = local.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront Origin Access Control
resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "maffindi-cv-oac"
  description                       = "OAC for Maffindi CV Website"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# S3 Bucket Policy to allow CloudFront
resource "aws_s3_bucket_policy" "allow_cloudfront" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipal"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.s3_distribution.arn
          }
        }
      }
    ]
  })
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = "S3-${local.bucket_name}"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "maffindi.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${local.bucket_name}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100" # Use PriceClass_All for global coverage if needed

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Upload Files
resource "aws_s3_object" "html" {
  bucket       = aws_s3_bucket.website_bucket.id
  key          = "maffindi.html"
  source       = "maffindi.html"
  content_type = "text/html"
  etag         = filemd5("maffindi.html")
}

resource "aws_s3_object" "image" {
  bucket       = aws_s3_bucket.website_bucket.id
  key          = "my pic.jpg"
  source       = "my pic.jpg"
  content_type = "image/jpeg"
  etag         = filemd5("my pic.jpg")
}

# --- VISITOR COUNTER BACKEND ---

# DynamoDB Table
resource "aws_dynamodb_table" "visitor_counter" {
  name           = "VisitorCount"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

# IAM Role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "visitor_counter_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Policy for DynamoDB Access
resource "aws_iam_role_policy" "lambda_dynamodb_policy" {
  name = "lambda_dynamodb_policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:UpdateItem",
          "dynamodb:GetItem"
        ]
        Resource = aws_dynamodb_table.visitor_counter.arn
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

# Archive the Python script
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "visitor_counter.py"
  output_path = "visitor_counter.zip"
}

# Lambda Function
resource "aws_lambda_function" "visitor_counter" {
  filename      = "visitor_counter.zip"
  function_name = "VisitorCounterFunction"
  role          = aws_iam_role.lambda_role.arn
  handler       = "visitor_counter.lambda_handler"
  runtime       = "python3.9"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.visitor_counter.name
    }
  }
}

# Lambda Function URL (Public Endpoint)
resource "aws_lambda_function_url" "visitor_counter_url" {
  function_name      = aws_lambda_function.visitor_counter.function_name
  authorization_type = "NONE"

  cors {
    allow_origins     = ["*"]
    allow_methods     = ["GET"]
    allow_headers     = ["date", "keep-alive"]
    expose_headers    = ["keep-alive", "date"]
    max_age           = 86400
  }
}

# Permission for public access to Function URL
resource "aws_lambda_permission" "url_public_access" {
  statement_id  = "AllowPublicAccessUrl"
  action        = "lambda:InvokeFunctionUrl"
  function_name = aws_lambda_function.visitor_counter.function_name
  principal     = "*"
  function_url_auth_type = "NONE"
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.website_bucket.id
}

output "visitor_counter_endpoint" {
  value = aws_lambda_function_url.visitor_counter_url.function_url
}
