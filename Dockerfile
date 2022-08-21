FROM python

COPY requirements.txt .

RUN pip install -r requirements.txt
COPY . .

# EXPOSE 3306

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]



