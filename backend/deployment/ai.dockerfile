# === Stage 1: Build dependencies ===
FROM python:3.12.8 AS builder
WORKDIR /build
COPY deployment/req.txt .
RUN pip install --no-cache-dir --prefix=/install -r req.txt

# === Stage 2: Final image ===
FROM python:3.12.8
WORKDIR /src

# Copy installed packages
COPY --from=builder /install /usr/local

# Copy app code
COPY app/ /src/app/
