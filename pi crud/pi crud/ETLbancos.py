import mysql.connector
import time

# Configurações dos bancos
config_banco_api = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Jdocema123456@',
    'database': 'banco_api'
}

config_bancodw = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Jdocema123456@',
    'database': 'bancodw'
}

def conectar_mysql(config):
    return mysql.connector.connect(**config)


def sincronizar_tabela(cnx_api, cnx_dw, tabela_api, tabela_dw, pk_api, pk_dw, colunas_api, colunas_dw):
    """
    Sincroniza dados de uma tabela entre dois bancos com mapeamento de colunas diferentes.
    """
    cursor_api = cnx_api.cursor(dictionary=True)
    cursor_dw = cnx_dw.cursor(dictionary=True)

    # Busca dados do banco origem (banco_api)
    sql_api = f"SELECT {pk_api}, {', '.join(colunas_api)} FROM {tabela_api}"
    cursor_api.execute(sql_api)
    dados_api = cursor_api.fetchall()

    # Busca dados do banco destino (bancodw)
    sql_dw = f"SELECT {pk_dw}, {', '.join(colunas_dw)} FROM {tabela_dw}"
    cursor_dw.execute(sql_dw)
    dados_dw = cursor_dw.fetchall()

    dict_api = {row[pk_api]: row for row in dados_api}
    dict_dw = {row[pk_dw]: row for row in dados_dw}

    # Insert ou update
    for pk_val, row_api in dict_api.items():
        if pk_val not in dict_dw:
            # Insert
            colunas_str = ", ".join([pk_dw] + colunas_dw)
            valores_str = ", ".join(["%s"] * (1 + len(colunas_dw)))
            valores = [pk_val] + [row_api[col_api] for col_api in colunas_api]
            sql_insert = f"INSERT INTO {tabela_dw} ({colunas_str}) VALUES ({valores_str})"
            cursor_dw.execute(sql_insert, valores)
        else:
            row_dw = dict_dw[pk_val]
            precisa_atualizar = False
            for col_api, col_dw in zip(colunas_api, colunas_dw):
                if row_api[col_api] != row_dw[col_dw]:
                    precisa_atualizar = True
                    break
            if precisa_atualizar:
                set_str = ", ".join([f"{col_dw}=%s" for col_dw in colunas_dw])
                valores = [row_api[col_api] for col_api in colunas_api] + [pk_val]
                sql_update = f"UPDATE {tabela_dw} SET {set_str} WHERE {pk_dw}=%s"
                cursor_dw.execute(sql_update, valores)


    cnx_dw.commit()
    cursor_api.close()
    cursor_dw.close()

def main():
    while True:
        try:
            cnx_api = conectar_mysql(config_banco_api)
            cnx_dw = conectar_mysql(config_bancodw)

            # Define suas tabelas, pk e colunas (exceto pk)
            tabelas = [
                ('cargo', 'cargo', 'idcargo', 'id', ['tipo', 'descricao'], ['tipo', 'descricao']),
                ('produto', 'produto', 'idproduto', 'idProduto', ['descricao', 'valor', 'estoque', 'categoria_idCategoria'],  ['descricao', 'valor', 'estoque', 'categoria_idCategoria']),
                ('categoria', 'categoria', 'idCategoria', 'idCategoria', ['nome'], ['nome']),
                ('cidade', 'cidade', 'idCidade', 'idCidade', ['estado', 'municipio'], ['estado', 'municipio']),
                ('cliente', 'cliente', 'idcliente', 'idCliente', ['nome', 'cpf',  'telefone', 'endereco', 'cep', 'email','genero', 'senha', 'cidade_idCidade', 'idcargo'], ['nome', 'cpf',  'telefone', 'endereco', 'cep', 'email','genero', 'senha', 'cidade_idCidade', 'cargo_id']),
                ('itens_venda', 'itens_venda', 'iditens_venda', 'idItens_venda', ['quant_unit', 'valor_unit', 'idProduto'], ['valor_unit','quant_unit', 'produto_idProduto']),
                ('venda', 'venda', 'idvenda', 'idVenda', ['data','quant_total', 'valor_total', 'idCliente' ], ['data', 'quant_total', 'valor_total', 'cliente_idCliente']),
            ]

            for t in tabelas:
                print(f"Sincronizando tabela {t[0]}...")
                sincronizar_tabela(cnx_api, cnx_dw, *t)

            cnx_api.close()
            cnx_dw.close()

            print("Sincronização concluída! Aguardando 1 minuto...")
            time.sleep(60)

        except Exception as e:
            print("Erro durante a sincronização:", e)
            print("Tentando novamente em 1 minuto...")
            time.sleep(60)

if __name__ == "__main__":
    main()
