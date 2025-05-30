import pandas as pd
import os
from sqlalchemy import create_engine
import urllib.parse

# Caminho para o arquivo Excel
caminho_arquivo = os.path.expanduser('~/Downloads/popcidadenov.xlsx')

# Lê o Excel
df = pd.read_excel(caminho_arquivo)

# Verifica se as colunas esperadas existem
coluna_uf = 'UF'
coluna_municipio = 'NOME DO MUNICÍPIO'

if coluna_uf not in df.columns or coluna_municipio not in df.columns:
    print(f"Erro: colunas '{coluna_uf}' e/ou '{coluna_municipio}' não encontradas.")
    exit()

# Seleciona e renomeia as colunas
df_cidade = df[[coluna_municipio, coluna_uf]].rename(columns={
    coluna_municipio: 'municipio',
    coluna_uf: 'estado'
})

# Remove duplicatas, se houver
df_cidade = df_cidade.drop_duplicates()

# Conexão com o MySQL
user = 'root'
password = 'Jdocema123456@'
host = '127.0.0.1'
database = 'banco_api'
password_esc = urllib.parse.quote_plus(password)

engine = create_engine(f"mysql+pymysql://{user}:{password_esc}@{host}/{database}")

# Tenta inserir os dados
try:
    df_cidade.to_sql('cidade', con=engine, if_exists='append', index=False)
    print("Dados inseridos com sucesso!")
except Exception as e:
    print("Erro ao inserir dados:", e)
