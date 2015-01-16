# Bulk Insert

This inserts a bulk amount of messages onto the rabbitmq exchange to provide some load test data

## Setup

Ensure you have the following installed
- [Python](https://www.python.org/downloads/)
- [PIP](https://pip.pypa.io/en/latest/installing.html)

```
pip install pika
```

## Usage

```bash
python bulk_insert.py "routing-key" "my message"
```
