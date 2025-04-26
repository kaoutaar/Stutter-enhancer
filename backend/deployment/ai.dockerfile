FROM python:3.12.8
WORKDIR /src
COPY req.txt /src/
RUN pip install --no-cache-dir -r req.txt


