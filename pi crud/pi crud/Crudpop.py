import pandas as pd
import os
from sqlalchemy import create_engine
import urllib.parse

# Caminho para o Excel
caminho_arquivo = os.path.expanduser('~/Downloads/pop_quantnovo.xlsx')

# Lê o arquivo Excel
df = pd.read_excel(caminho_arquivo)

# Verifica se a coluna esperada existe
coluna_populacao = 'POPULAÇÃO ESTIMADA'
if coluna_populacao not in df.columns:
    print(f"Coluna '{coluna_populacao}' não encontrada.")
    exit()

# Seleciona e renomeia a coluna
df_populacao = df[[coluna_populacao]].rename(columns={coluna_populacao: 'quant'})

# Conexão com o MySQL
user = 'root'
password = 'Jdocema123456@'
host = '127.0.0.1'
database = 'bancodw'
password_esc = urllib.parse.quote_plus(password)

engine = create_engine(f"mysql+pymysql://{user}:{password_esc}@{host}/{database}")

# Busca os IDs válidos da tabela cidade
with engine.connect() as connection:
    cidade_ids = pd.read_sql("SELECT idCidade FROM cidade ORDER BY idCidade", connection)

# Verifica se há IDs suficientes
if len(cidade_ids) < len(df_populacao):
    print("Erro: menos IDs na tabela cidade do que linhas no Excel.")
    exit()

# Adiciona os IDs reais
df_populacao['cidade_idCidade'] = cidade_ids['idCidade'].head(len(df_populacao)).values

# Tenta inserir os dados
try:
    df_populacao.to_sql('populacao', con=engine, if_exists='append', index=False)
    print("Dados inseridos com sucesso!")
except Exception as e:
    print("Erro ao inserir dados:", e)
