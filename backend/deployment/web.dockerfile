# === Stage 1: Install dependencies ===
FROM python:3.12.8 AS builder
WORKDIR /build
COPY deployment/req.txt .
RUN pip install --no-cache-dir --prefix=/install -r req.txt

# === Stage 2: Runtime ===
FROM python:3.12.8
WORKDIR /src

# Copy installed dependencies
COPY --from=builder /install /usr/local

# Copy app code
COPY app/ /src/app/
COPY deployment/ /src/deployment/
