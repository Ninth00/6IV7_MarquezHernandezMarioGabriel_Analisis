import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

#Descargar las siguientes librerias para su correcto funcionamiento
#pip install matplotlib
#pip install openpyxl

# Cargar los archivos de Excel
archivo_sucursales = 'Catalogo_sucursal.xlsx'
archivo_proyecto = 'proyecto1.xlsx'

# Leer el archivo de sucursales
sucursales_df = pd.read_excel(archivo_sucursales)

# Leer el archivo del proyecto
proyecto_df = pd.read_excel(archivo_proyecto)

# 1. Conocer las ventas totales del comercio
ventas_totales = proyecto_df['ventas_tot'].sum()
print(f'Las ventas totales del comercio son: {ventas_totales}')

# 2. Conocer cuántos socios tienen adeudo y cuántos no tienen adeudo
# Reemplazar las cadenas 'Con adeudo' y 'Sin adeudo' por valores numéricos
proyecto_df['B_adeudo'] = proyecto_df['B_adeudo'].replace({'Con adeudo': 1, 'Sin adeudo': 0})

# Verificar los primeros valores de la columna 'B_adeudo' después del reemplazo
print(proyecto_df['B_adeudo'].head(10))

# Filtrar socios con y sin adeudo
socios_adeudo = proyecto_df[proyecto_df['B_adeudo'] == 1]
socios_sin_adeudo = proyecto_df[proyecto_df['B_adeudo'] == 0]

# Verificar el número de socios con y sin adeudo
total_socios = len(proyecto_df)
socios_con_adeudo = len(socios_adeudo)
socios_sin_adeudo = len(socios_sin_adeudo)

# Calcular los porcentajes
porcentaje_adeudo = (socios_con_adeudo / total_socios) * 100
porcentaje_sin_adeudo = (socios_sin_adeudo / total_socios) * 100

print(f'Porcentaje de socios con adeudo: {porcentaje_adeudo}%')
print(f'Porcentaje de socios sin adeudo: {porcentaje_sin_adeudo}%')

# 3. Gráfica de ventas totales respecto del tiempo (por mes)
# Asegurarnos de que 'fec_ini_cdto' sea de tipo datetime
proyecto_df['fec_ini_cdto'] = pd.to_datetime(proyecto_df['fec_ini_cdto'])

# Agrupar por mes y sumar las ventas
ventas_por_mes = proyecto_df.groupby(proyecto_df['fec_ini_cdto'].dt.to_period('M'))['ventas_tot'].sum()

# Graficar las ventas totales por mes
plt.figure(figsize=(10, 6))
ventas_por_mes.plot(kind='bar', color='skyblue')

# Título y etiquetas de los ejes
plt.title('Ventas Totales del Comercio por Mes')
plt.xlabel('Mes')
plt.ylabel('Ventas Totales')

# Formatear el eje Y para evitar notación científica
plt.ticklabel_format(style='plain', axis='y')

# Establecer el formato de las marcas del eje Y para que se muestren sin decimales
plt.gca().yaxis.set_major_formatter(ticker.FuncFormatter(lambda x, pos: '%1.0f' % x))

# Establecer un intervalo adecuado para los ticks del eje Y (ajustar según tus datos)
plt.gca().yaxis.set_major_locator(ticker.MultipleLocator(50000000))  # Ajusta el intervalo según tus datos

# Configurar el ángulo de las etiquetas en el eje X
plt.xticks(rotation=45)

# Ajustar la distribución para evitar superposición de elementos
plt.tight_layout()

# Mostrar el gráfico
plt.show()

# Calcular la desviación estándar de los pagos por mes
desviacion_estandar_por_mes = proyecto_df.groupby(proyecto_df['fec_ini_cdto'].dt.to_period('M'))['pagos_tot'].std()

# Graficar la desviación estándar de los pagos por mes
plt.figure(figsize=(10, 6))
desviacion_estandar_por_mes.plot(kind='bar', color='salmon')

# Título y etiquetas de los ejes
plt.title('Desviación Estándar de los Pagos Totales por Mes')
plt.xlabel('Mes')
plt.ylabel('Desviación Estándar de Pagos Totales')

# Formatear el eje Y para evitar notación científica
plt.ticklabel_format(style='plain', axis='y')

# Mostrar el gráfico
plt.tight_layout()
plt.show()

# Calcular la deuda total de los clientes
deuda_total = proyecto_df['adeudo_actual'].sum()

print(f'La deuda total de los clientes es: {deuda_total}')

# Calcular el porcentaje de utilidad del comercio
porcentaje_utilidad = ((ventas_totales - deuda_total) / ventas_totales) * 100

print(f'El porcentaje de utilidad del comercio es: {porcentaje_utilidad}%')

proyecto_df['fec_ini_cdto'] = pd.to_datetime(proyecto_df['fec_ini_cdto'])

# 1. Relacionamos el id_sucursal con el nombre de la sucursal
# Unir los dos DataFrames por el 'id_sucursal'
proyecto_df = proyecto_df.merge(sucursales_df[['id_sucursal', 'suc']], on='id_sucursal', how='left')

# Sumar las ventas por sucursal
ventas_por_sucursal = proyecto_df.groupby('suc')['ventas_tot'].sum()

# Crear un gráfico circular
plt.figure(figsize=(8, 8))
ventas_por_sucursal.plot(kind='pie', autopct='%1.1f%%', startangle=90, colors=plt.cm.Paired.colors)

# Título del gráfico
plt.title('Ventas Totales por Sucursal')

# Mostrar el gráfico
plt.ylabel('')  # Elimina la etiqueta del eje Y
plt.tight_layout()
plt.show()

# Calcular las deudas totales y ventas por sucursal
deuda_y_ventas_por_sucursal = proyecto_df.groupby('suc').agg({'adeudo_actual': 'sum', 'ventas_tot': 'sum'}).reset_index()

# Calcular el margen de utilidad
deuda_y_ventas_por_sucursal['margen_utilidad'] = ((deuda_y_ventas_por_sucursal['ventas_tot'] - deuda_y_ventas_por_sucursal['adeudo_actual']) / deuda_y_ventas_por_sucursal['ventas_tot']) * 100

# Crear el gráfico
fig, ax1 = plt.subplots(figsize=(10, 6))

# Gráfico de barras para las deudas
ax1.bar(deuda_y_ventas_por_sucursal['suc'], deuda_y_ventas_por_sucursal['adeudo_actual'], color='tomato', alpha=0.7, label='Deudas Totales')
ax1.set_ylabel('Deudas Totales', color='tomato')
ax1.tick_params(axis='y', labelcolor='tomato')

# Agregar una segunda escala en el mismo gráfico para el margen de utilidad
ax2 = ax1.twinx()
ax2.plot(deuda_y_ventas_por_sucursal['suc'], deuda_y_ventas_por_sucursal['margen_utilidad'], color='blue', marker='o', label='Margen de Utilidad (%)')
ax2.set_ylabel('Margen de Utilidad (%)', color='blue')
ax2.tick_params(axis='y', labelcolor='blue')

# Títulos y formato
plt.title('Deudas Totales y Margen de Utilidad por Sucursal')
fig.tight_layout()
plt.show()
